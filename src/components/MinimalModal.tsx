import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Pressable,
  Platform,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

interface ModalButton {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface MinimalModalProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons: ModalButton[];
  onDismiss: () => void;
}

export const MinimalModal: React.FC<MinimalModalProps> = ({
  visible,
  title,
  message,
  buttons,
  onDismiss,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          speed: 20,
          bounciness: 4,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />

      {/* Centered content — separate from backdrop so shadows aren't clipped */}
      <Pressable style={styles.pressableArea} onPress={onDismiss}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={[
              styles.card,
              styles.cardShadow,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}

            <View style={styles.buttonRow}>
              {buttons.map((btn, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.button,
                    btn.destructive && styles.buttonDestructive,
                    buttons.length === 1 && styles.buttonFull,
                  ]}
                  onPress={() => {
                    btn.onPress();
                    onDismiss();
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      btn.destructive && styles.buttonTextDestructive,
                      buttons.length === 1 && !btn.destructive && styles.buttonTextFull,
                    ]}
                  >
                    {btn.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  pressableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    width: 300,
  },
  cardShadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 32,
    },
    android: {
      elevation: 24,
    },
    default: {},
  }) as object,
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md - 2,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
  },
  buttonFull: {
    backgroundColor: COLORS.primary,
  },
  buttonDestructive: {
    backgroundColor: '#FEE2E2',
  },
  buttonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  buttonTextFull: {
    color: COLORS.textOnPrimary,
  },
  buttonTextDestructive: {
    color: COLORS.recording,
  },
});
