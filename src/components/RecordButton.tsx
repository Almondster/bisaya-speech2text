import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface RecordButtonProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  isListening,
  onPress,
  disabled = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const ringAnim1 = useRef(new Animated.Value(1)).current;
  const ringOpacity1 = useRef(new Animated.Value(0.4)).current;
  const ringAnim2 = useRef(new Animated.Value(1)).current;
  const ringOpacity2 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isListening) {
      // Pulse animation for the button
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Ring animations
      Animated.loop(
        Animated.parallel([
          Animated.timing(ringAnim1, {
            toValue: 1.8,
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity1, {
            toValue: 0,
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.delay(500),
          Animated.parallel([
            Animated.timing(ringAnim2, {
              toValue: 1.8,
              duration: 1500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(ringOpacity2, {
              toValue: 0,
              duration: 1500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();

      // Glow
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      pulseAnim.stopAnimation();
      ringAnim1.stopAnimation();
      ringOpacity1.stopAnimation();
      ringAnim2.stopAnimation();
      ringOpacity2.stopAnimation();

      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ringAnim1, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity1, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ringAnim2, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity2, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      pulseAnim.stopAnimation();
      ringAnim1.stopAnimation();
      ringOpacity1.stopAnimation();
      ringAnim2.stopAnimation();
      ringOpacity2.stopAnimation();
    };
  }, [isListening]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      {/* Expanding rings */}
      {isListening && (
        <>
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: ringAnim1 }],
                opacity: ringOpacity1,
                borderColor: COLORS.recording,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: ringAnim2 }],
                opacity: ringOpacity2,
                borderColor: COLORS.recording,
              },
            ]}
          />
        </>
      )}

      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { scale: Animated.multiply(pulseAnim, scaleAnim) },
            ],
          },
        ]}
      >
        {/* Glow effect */}
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: opacityAnim,
            },
          ]}
        />

        <TouchableOpacity
          style={[
            styles.button,
            isListening && styles.buttonRecording,
            disabled && styles.buttonDisabled,
          ]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <Ionicons
            name={isListening ? 'stop' : 'mic'}
            size={36}
            color={COLORS.textOnPrimary}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const BUTTON_SIZE = 80;
const RING_SIZE = BUTTON_SIZE + 20;

const styles = StyleSheet.create({
  wrapper: {
    width: BUTTON_SIZE * 2.2,
    height: BUTTON_SIZE * 2.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2,
  },
  glow: {
    position: 'absolute',
    width: BUTTON_SIZE + 30,
    height: BUTTON_SIZE + 30,
    borderRadius: (BUTTON_SIZE + 30) / 2,
    backgroundColor: COLORS.recordingLight,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonRecording: {
    backgroundColor: COLORS.recording,
    shadowColor: COLORS.recording,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textMuted,
    shadowOpacity: 0,
  },
});
