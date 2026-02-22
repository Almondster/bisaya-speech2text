import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  interimTranscript,
  isListening,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const cursorAnim = useRef(new Animated.Value(0)).current;

  const hasContent = transcript.length > 0 || interimTranscript.length > 0;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cursorAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(cursorAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      cursorAnim.stopAnimation();
      cursorAnim.setValue(0);
    }
  }, [isListening]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {!hasContent && !isListening ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Tap the microphone button{'\n'}to start speaking in Bisaya
            </Text>
          </View>
        ) : (
          <Text style={styles.transcriptText}>
            {transcript}
            {interimTranscript ? (
              <Text style={styles.interimText}>
                {transcript.length > 0 ? ' ' : ''}
                {interimTranscript}
              </Text>
            ) : null}
            {isListening && (
              <Animated.Text
                style={[styles.cursor, { opacity: cursorAnim }]}
              >
                |
              </Animated.Text>
            )}
          </Text>
        )}

        {isListening && !hasContent && (
          <View style={styles.listeningContainer}>
            <Text style={styles.listeningText}>Listening...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  placeholderText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  transcriptText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  interimText: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  cursor: {
    color: COLORS.primary,
    fontWeight: '300',
    fontSize: FONT_SIZE.lg,
  },
  listeningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  listeningText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});
