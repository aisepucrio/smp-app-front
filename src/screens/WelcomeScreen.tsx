import { ArrowRight } from "lucide-react-native";
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          Welcome to <Text style={styles.bold}>BuddyMents</Text>
        </Text>
        <Text style={styles.subtitle}>Your daily mental health report!</Text>

        <Image
          source={require("../assets/owl.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <ArrowRight size={20} color="#05060B" style={{ marginLeft: 8 }} />
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
    backgroundColor: "#7287D9",
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
    color: "#FFFFFF",
    textAlign: "center",
  },
  bold: {
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    color: "#F7F7F7",
    textAlign: "center",
    maxWidth: 320,
  },
  buttonsWrapper: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#FFCE5C",
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
