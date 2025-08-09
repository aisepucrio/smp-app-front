import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }: any) {
  const theme = useColorScheme() ?? "light";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, { color: Colors[theme].text }]} numberOfLines={1} adjustsFontSizeToFit>
          Welcome to <Text style={styles.bold}>BuddyMents</Text>
        </Text>
        <Text style={[styles.subtitle, { color: Colors[theme].icon }]}>Your daily mental health report!</Text>

        <Image
          source={require("@/src/assets/owl.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.primaryButton, { backgroundColor: Colors[theme].tint }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#05060B" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.secondaryButtonText}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const IMAGE_SIZE = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentWrapper: {
    alignItems: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  title: {
    marginTop: 0,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
  },
  bold: {
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    maxWidth: 320,
  },
  buttonsWrapper: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#05060B",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 12,
    marginBottom: 50,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
