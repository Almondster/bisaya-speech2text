import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

interface ActionBarProps {
  transcript: string;
  onClear: () => void;
  isListening: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  transcript,
  onClear,
  isListening,
}) => {
  const hasText = transcript.length > 0;

  const handleCopy = async () => {
    if (!hasText) return;
    await Clipboard.setStringAsync(transcript);
    Alert.alert('Copied!', 'Text has been copied to your clipboard.');
  };

  const handleShare = async () => {
    if (!hasText) return;
    try {
      await Share.share({
        message: transcript,
        title: 'Transcribed Text',
      });
    } catch {
      // User cancelled share
    }
  };

  const handleClear = () => {
    if (!hasText && !isListening) return;
    Alert.alert(
      'Clear Transcript',
      'Are you sure you want to clear all text?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: onClear },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ActionButton
        icon="copy-outline"
        label="Copy"
        onPress={handleCopy}
        disabled={!hasText}
      />
      <ActionButton
        icon="share-outline"
        label="Share"
        onPress={handleShare}
        disabled={!hasText}
      />
      <ActionButton
        icon="trash-outline"
        label="Clear"
        onPress={handleClear}
        disabled={!hasText && !isListening}
        destructive
      />
    </View>
  );
};

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onPress,
  disabled = false,
  destructive = false,
}) => (
  <TouchableOpacity
    style={[styles.actionButton, disabled && styles.actionButtonDisabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
  >
    <View
      style={[
        styles.iconContainer,
        disabled && styles.iconContainerDisabled,
        destructive && !disabled && styles.iconContainerDestructive,
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={
          disabled
            ? COLORS.textMuted
            : destructive
              ? COLORS.recording
              : COLORS.primary
        }
      />
    </View>
    <Text
      style={[
        styles.actionLabel,
        disabled && styles.actionLabelDisabled,
        destructive && !disabled && styles.actionLabelDestructive,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xl,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  actionButton: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDisabled: {
    backgroundColor: COLORS.border,
  },
  iconContainerDestructive: {
    backgroundColor: '#FEE2E2',
  },
  actionLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  actionLabelDisabled: {
    color: COLORS.textMuted,
  },
  actionLabelDestructive: {
    color: COLORS.recording,
  },
});
