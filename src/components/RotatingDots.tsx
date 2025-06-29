import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

interface Props {
  size?: number;
  dotRadius?: number;
  color?: string;
  onFinish?: () => void;
  durationMs?: number;
}

export default function RotatingDots({
  size = 120,
  dotRadius = 30,
  color = "#FFCE5C",
  onFinish,
}: Props) {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    return () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => finished && onFinish && onFinish());
    };
  }, []);

  const DOT_COUNT = 4;
  const dots = [];
  const radius = size / 2 - dotRadius;
  const center = size / 2 - dotRadius;

  for (let i = 0; i < DOT_COUNT; i++) {
    const angle = (i * Math.PI) / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    const scale = rotate.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 2.4, 0, 2.4, 0],
      extrapolate: "extend",
    });

    dots.push(
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            width: dotRadius * 2,
            height: dotRadius * 2,
            borderRadius: dotRadius,
            backgroundColor: color,
            top: y,
            left: x,
            transform: [{ scale }],
          },
        ]}
      />,
    );
  }

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ width: size, height: size, opacity }}>
      <Animated.View
        style={{ width: size, height: size, transform: [{ rotate: spin }] }}
      >
        {dots}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
  },
});
