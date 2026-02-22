import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

export interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isAvailable: boolean;
  /** The locale currently being used for recognition */
  activeLocale: string;
}

export interface SpeechRecognitionActions {
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  clearTranscript: () => void;
}

// Try Cebuano first, fall back to Filipino (Tagalog) — NEVER English.
const LOCALE_PRIORITY = ['ceb-PH', 'ceb', 'fil-PH', 'fil'] as const;

function normalizeLocale(tag: string): string {
  return tag.replace(/_/g, '-').toLowerCase();
}

export function useSpeechRecognition(): SpeechRecognitionState & SpeechRecognitionActions {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [activeLocale, setActiveLocale] = useState<string>(LOCALE_PRIORITY[0]);
  const resolvedLocale = useRef<string>(LOCALE_PRIORITY[0]);

  useEffect(() => {
    (async () => {
      try {
        const result = await ExpoSpeechRecognitionModule.getStateAsync();
        setIsAvailable(result === 'inactive' || result === 'recognizing');

        // Find the best available locale from our priority list
        try {
          const supportedLocales =
            await ExpoSpeechRecognitionModule.getSupportedLocales({});
          const normalized = supportedLocales.locales.map(normalizeLocale);

          for (const locale of LOCALE_PRIORITY) {
            if (normalized.includes(normalizeLocale(locale))) {
              resolvedLocale.current = locale;
              setActiveLocale(locale);
              break;
            }
          }

          // Also check partial match for 'ceb' or 'fil'
          if (!LOCALE_PRIORITY.some((l) => normalized.includes(normalizeLocale(l)))) {
            const cebMatch = supportedLocales.locales.find((l: string) =>
              normalizeLocale(l).startsWith('ceb')
            );
            if (cebMatch) {
              resolvedLocale.current = cebMatch;
              setActiveLocale(cebMatch);
            } else {
              const filMatch = supportedLocales.locales.find((l: string) =>
                normalizeLocale(l).startsWith('fil')
              );
              if (filMatch) {
                resolvedLocale.current = filMatch;
                setActiveLocale(filMatch);
              }
              // If neither ceb nor fil found, keep ceb-PH and let cloud handle it
            }
          }
        } catch {
          // Can't query locales — keep default
        }
      } catch {
        setIsAvailable(false);
      }
    })();
  }, []);

  // Handle speech recognition results
  useSpeechRecognitionEvent('result', (event) => {
    const results = event.results;
    if (results && results.length > 0) {
      const latestResult = results[results.length - 1];
      if (latestResult) {
        const text = latestResult.transcript || '';
        if (event.isFinal) {
          setTranscript((prev) => {
            const separator = prev.length > 0 ? ' ' : '';
            return prev + separator + text;
          });
          setInterimTranscript('');
        } else {
          setInterimTranscript(text);
        }
      }
    }
  });

  useSpeechRecognitionEvent('start', () => {
    setIsListening(true);
    setError(null);
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
    setInterimTranscript('');
  });

  useSpeechRecognitionEvent('error', (event) => {
    setIsListening(false);
    setInterimTranscript('');

    // Don't show error for "no-speech" – it's normal
    if (event.error !== 'no-speech') {
      setError(getErrorMessage(event.error));
    }
  });

  const startListening = useCallback(async () => {
    try {
      setError(null);

      const { granted } =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        setError('Microphone permission is required to use speech recognition.');
        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: resolvedLocale.current,
        interimResults: true,
        continuous: true,
        maxAlternatives: 1,
        requiresOnDeviceRecognition: false,
        addsPunctuation: true,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to start speech recognition.');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (err: any) {
      setError(err.message || 'Failed to stop speech recognition.');
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isAvailable,
    activeLocale,
    startListening,
    stopListening,
    clearTranscript,
  };
}

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'not-allowed':
      return 'Microphone access was denied. Please enable it in Settings.';
    case 'network':
      return 'Network error. Please check your internet connection.';
    case 'audio-capture':
      return 'No microphone was found. Please check your device.';
    case 'language-not-supported':
      return 'Cebuano/Filipino speech recognition is not available. Please check your internet connection.';
    case 'service-not-allowed':
      return 'Speech recognition service is not available.';
    case 'busy':
      return 'Speech recognition is busy. Please try again.';
    default:
      return `Speech recognition error: ${errorCode}`;
  }
}
