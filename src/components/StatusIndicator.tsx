import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface StatusIndicatorProps {
  isListening: boolean;
  error: string | null;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isListening,
  error,
}) => {
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <View style={[styles.dot, styles.errorDot]} />
        <Text style={[styles.text, styles.errorText]} numberOfLines={2}>
          {error}
        </Text>
      </View>
    );
  }

  if (isListening) {
    return (
      <View style={[styles.container, styles.listeningContainer]}>
        <View style={[styles.dot, styles.listeningDot]} />
        <Text style={[styles.text, styles.listeningText]}>
          Listening in Bisaya...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.readyText]}>
        Ready to listen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    minHeight: 36,
  },
  listeningContainer: {},
  errorContainer: {
    paddingHorizontal: SPACING.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listeningDot: {
    backgroundColor: COLORS.recording,
  },
  errorDot: {
    backgroundColor: COLORS.warning,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
  readyText: {
    color: COLORS.textMuted,
  },
  listeningText: {
    color: COLORS.recording,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.warning,
    fontSize: FONT_SIZE.xs,
  },
});
