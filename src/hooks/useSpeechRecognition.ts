import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { Platform } from 'react-native';

export interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isAvailable: boolean;
}

export interface SpeechRecognitionActions {
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  clearTranscript: () => void;
}

// Cebuano locale codes to try in order of preference
const CEBUANO_LOCALES = ['ceb-PH', 'ceb', 'fil-PH', 'fil'];

export function useSpeechRecognition(): SpeechRecognitionState & SpeechRecognitionActions {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const selectedLocale = useRef<string>(CEBUANO_LOCALES[0]);

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.getStateAsync();
      setIsAvailable(result === 'inactive' || result === 'recognizing');

      // Try to find the best supported Cebuano locale
      try {
        const supportedLocales =
          await ExpoSpeechRecognitionModule.getSupportedLocales({});
        const locales = supportedLocales.locales.map((l: string) =>
          l.toLowerCase()
        );

        for (const locale of CEBUANO_LOCALES) {
          if (locales.includes(locale.toLowerCase())) {
            selectedLocale.current = locale;
            break;
          }
        }
      } catch {
        // Default to ceb-PH if we can't check
        selectedLocale.current = 'ceb-PH';
      }
    } catch {
      setIsAvailable(false);
    }
  };

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

      // Request permissions first
      const { granted } =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        setError('Microphone permission is required to use speech recognition.');
        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: selectedLocale.current,
        interimResults: true,
        continuous: true,
        maxAlternatives: 1,
        requiresOnDeviceRecognition: false,
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
      return 'Cebuano may not be fully supported on this device.';
    case 'service-not-allowed':
      return 'Speech recognition service is not available.';
    case 'busy':
      return 'Speech recognition is busy. Please try again.';
    default:
      return `Speech recognition error: ${errorCode}`;
  }
}
