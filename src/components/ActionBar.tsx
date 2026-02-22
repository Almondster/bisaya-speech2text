import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';
import { MinimalModal } from './MinimalModal';

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
  const [showCopied, setShowCopied] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleCopy = async () => {
    if (!hasText) return;
    await Clipboard.setStringAsync(transcript);
    setShowCopied(true);
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
    setShowClearConfirm(true);
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

      <MinimalModal
        visible={showCopied}
        title="Copied!"
        message="Text has been copied to your clipboard."
        buttons={[{ label: 'OK', onPress: () => {} }]}
        onDismiss={() => setShowCopied(false)}
      />

      <MinimalModal
        visible={showClearConfirm}
        title="Clear Transcript"
        message="Are you sure you want to clear all text?"
        buttons={[
          { label: 'Cancel', onPress: () => {} },
          { label: 'Clear', onPress: onClear, destructive: true },
        ]}
        onDismiss={() => setShowClearConfirm(false)}
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
