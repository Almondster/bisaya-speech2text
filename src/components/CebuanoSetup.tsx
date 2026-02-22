import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

interface CebuanoSetupProps {
  isChecking: boolean;
  onOpenSettings: () => void;
  onRetry: () => void;
}

export const CebuanoSetup: React.FC<CebuanoSetupProps> = ({
  isChecking,
  onOpenSettings,
  onRetry,
}) => {
  if (isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Checking Cebuano support...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🇵🇭</Text>
      </View>

      <Text style={styles.title}>Cebuano Language Required</Text>
      <Text style={styles.subtitle}>
        This app only works in Cebuano. Your device needs the Cebuano language
        pack for speech recognition to work properly.
      </Text>

      {Platform.OS === 'android' ? (
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>How to install Cebuano:</Text>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Open the <Text style={styles.bold}>Google</Text> app on your phone
            </Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Tap your profile picture → <Text style={styles.bold}>Settings</Text> →{' '}
              <Text style={styles.bold}>Voice</Text>
            </Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Tap <Text style={styles.bold}>Offline speech recognition</Text> (or
              "Languages")
            </Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>
              Find and download <Text style={styles.bold}>Cebuano</Text>
            </Text>
          </View>

          <Text style={styles.altPath}>
            Alternative path:{'\n'}
            Settings → Apps → Google → Language packs → Cebuano
          </Text>
        </View>
      ) : (
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>iOS Notice:</Text>
          <Text style={styles.stepText}>
            Apple's speech recognition does not support Cebuano. Please use an
            Android device with Google Speech Services for Cebuano
            speech-to-text.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={onOpenSettings}
        activeOpacity={0.8}
      >
        <Ionicons name="settings-outline" size={20} color={COLORS.textOnPrimary} />
        <Text style={styles.settingsButtonText}>Open Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.retryButton}
        onPress={onRetry}
        activeOpacity={0.7}
      >
        <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
        <Text style={styles.retryButtonText}>I've installed it — Check again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.xl,
    paddingTop: Platform.OS === 'android' ? SPACING.xxl + SPACING.xl : SPACING.xxl,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  stepsContainer: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepsTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
  },
  stepText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    flex: 1,
  },
  bold: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  altPath: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    gap: SPACING.sm,
    width: '100%',
    marginBottom: SPACING.md,
  },
  settingsButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: SPACING.sm,
    width: '100%',
  },
  retryButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
