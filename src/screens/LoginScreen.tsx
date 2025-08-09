import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import KeyboardDismissableScrollView from "@/components/KeyboardDismissableScrollView";
import { useAuth } from "@/src/contexts/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return Alert.alert("Error", "Fill in both fields");
    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      Alert.alert("Login failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardDismissableScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Svg
            width="100%"
            height="100%"
            viewBox="0 5 390 10"
            style={styles.headerSvg}
          >
            <Path d="M0 0 H390 V110 Q187.5 180 0 110 Z" fill="#6770E6" />
          </Svg>
          <View style={styles.headerImageWrapper}>
            <Image
              source={require("@/src/assets/owl.png")}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>
            Sign In{"\n"}
            <Text style={styles.titleBold}>BuddyMents</Text>
          </Text>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Mail size={18} stroke="#6770E6" />
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <View style={styles.inputContainer}>
            <LockKeyhole size={18} stroke="#6770E6" />
            <TextInput
              placeholder="Enter your password…"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={secure}
              autoCapitalize="none"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              {secure ? (
                <EyeOff size={18} stroke="#C4C4C4" />
              ) : (
                <Eye size={18} stroke="#C4C4C4" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.8}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.signInButtonText}>
              {loading ? "Signing…" : "Sign In"}
            </Text>
            <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialIconWrapper}
              activeOpacity={0.75}
            >
              <Ionicons name="logo-google" size={22} color="#6770E6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIconWrapper}
              activeOpacity={0.75}
            >
              <Ionicons name="logo-microsoft" size={22} color="#6770E6" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate("Register")}
              >
                Sign Up.
              </Text>
            </Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardDismissableScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6C758" },
  header: { width: "100%", height: 180, overflow: "hidden" },
  headerSvg: { position: "absolute", top: 0, left: 0 },
  headerImageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  headerImage: { height: 80, width: 128 },
  body: { flex: 1, paddingHorizontal: 24, marginTop: 16 },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 32,
    color: "#111827",
  },
  titleBold: { fontWeight: "800" },
  label: {
    marginTop: 24,
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: "#111827" },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A92E6",
    borderRadius: 999,
    paddingVertical: 14,
    marginTop: 24,
  },
  signInButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  socialRow: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
  socialIconWrapper: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  footer: { alignItems: "center", marginTop: 40 },
  footerText: { fontSize: 14, color: "#111827" },
  footerLink: { fontWeight: "600", color: "#6770E6" },
  forgotPassword: { marginTop: 4, fontSize: 14, color: "#F47171" },
  scrollView: {
    flexGrow: 1,
  },
});
