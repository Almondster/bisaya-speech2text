import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { useSpeechRecognition } from './src/hooks/useSpeechRecognition';
import { RecordButton } from './src/components/RecordButton';
import { TranscriptDisplay } from './src/components/TranscriptDisplay';
import { ActionBar } from './src/components/ActionBar';
import { StatusIndicator } from './src/components/StatusIndicator';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from './src/constants/theme';

export default function App() {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isAvailable,
    activeLocale,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  const localeName = activeLocale.startsWith('ceb') ? 'Cebuano' :
    activeLocale.startsWith('fil') ? 'Filipino' : 'Cebuano';

  const handleToggleListening = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics not available on all devices
    }

    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  }, [isListening, startListening, stopListening]);

  const wordCount = transcript
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bisaya</Text>
          <Text style={styles.subtitle}>Speech-to-Text</Text>
        </View>

        {/* Transcript Area */}
        <TranscriptDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
          isListening={isListening}
        />

        {/* Word Counter */}
        {wordCount > 0 && (
          <View style={styles.wordCountContainer}>
            <Text style={styles.wordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <ActionBar
          transcript={transcript}
          onClear={clearTranscript}
          isListening={isListening}
        />

        {/* Status */}
        <StatusIndicator isListening={isListening} error={error} />

        {/* Record Button */}
        <View style={styles.recordSection}>
          <RecordButton
            isListening={isListening}
            onPress={handleToggleListening}
            disabled={false}
          />
        </View>

        {/* Footer Language Badge */}
        <View style={styles.footer}>
          <View style={styles.languageBadge}>
            <Text style={styles.languageBadgeText}>🇵🇭 {localeName}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? SPACING.xxl + SPACING.md : SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontWeight: '400',
  },
  wordCountContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.xl + SPACING.sm,
    paddingTop: SPACING.sm,
  },
  wordCount: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  recordSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? SPACING.lg : SPACING.md,
  },
  languageBadge: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  languageBadgeText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
