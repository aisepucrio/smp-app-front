import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import RotatingDots from "@/src/components/RotatingDots";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LoadingScreen() {
  const theme = useColorScheme() ?? "light";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.spinnerWrapper}>
        <RotatingDots size={600} dotRadius={60} durationMs={2000} color={Colors[theme].tint} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  spinnerWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
