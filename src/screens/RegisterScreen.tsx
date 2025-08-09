import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import KeyboardDismissableScrollView from "@/components/KeyboardDismissableScrollView";
import { useAuth } from "@/src/contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const bg = useThemeColor({}, "authBackground");
  const authText = useThemeColor({}, "authText");
  const authLink = useThemeColor({}, "authLink");
  const label = useThemeColor({}, "label");
  const inputBg = useThemeColor({}, "inputBackground");
  const inputText = useThemeColor({}, "inputText");
  const tint = useThemeColor({}, "tint");
  const card = useThemeColor({}, "card");
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [badUserError, setBadUserError] = useState(false);
  const [badPasswordError, setBadPasswordError] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);
  const [serverError, setServerError] = useState("");


  const handleSignUp = async () => {
    // Limpar erros anteriores
    setEmailError(false);
    setPasswordError(false);
    setNetworkError(false);
    setBadUserError(false);
    setBadPasswordError(false);
    setUserExistsError(false);
    setServerError("");

    // Validações locais
    const emailValid = /.+@.+\..+/.test(email);
    setEmailError(!emailValid);
    const passwordsMatch = password === confirm;
    setPasswordError(!passwordsMatch);
    if (!emailValid || !passwordsMatch) return;

    try {
      setLoading(true);
      await register(email, email.split("@")[0], password);
    } catch (err: any) {
      const errorMessage = err.message || "Unknown error";
      
      // Verificar se é erro de rede
      if (errorMessage.includes("Network error") || 
          errorMessage.includes("Request timed out") || 
          errorMessage.includes("ECONNABORTED")) {
        setNetworkError(true);
        return;
      }
      
      // Verificar tipos específicos de erro baseado na mensagem
      if (errorMessage.includes("Bad request") || 
          errorMessage.includes("Invalid email") || 
          errorMessage.includes("Invalid user") ||
          errorMessage.includes("User validation failed")) {
        setBadUserError(true);
      } else if (errorMessage.includes("password") && 
                 (errorMessage.includes("weak") || 
                  errorMessage.includes("too short") || 
                  errorMessage.includes("invalid") ||
                  errorMessage.includes("Password validation failed"))) {
        setBadPasswordError(true);
      } else if (errorMessage.includes("Conflict") || 
                 errorMessage.includes("User already exists") || 
                 errorMessage.includes("already registered") ||
                 errorMessage.includes("email already in use") ||
                 errorMessage.includes("duplicate")) {
        setUserExistsError(true);
      } else {
        // Erro genérico do servidor
        setServerError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <KeyboardDismissableScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Svg
            width="100%"
            height="100%"
            viewBox="0 5 390 10"
            style={styles.headerSvg}
          >
            <Path d="M0 0 H390 V110 Q187.5 180 0 110 Z" fill={card} />
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
          <Text style={[styles.title, { color: authText }]}>
            Sign Up{"\n"}
            <Text style={styles.titleBold}>BuddyMents</Text>
          </Text>

          <Text style={[styles.label, { color: label }]}>Email Address</Text>
          <View
            style={[
              styles.inputContainer,
              emailError && { borderWidth: 2, borderColor: "#f98b7d" },
              { backgroundColor: inputBg },
            ]}
          >
            <Ionicons name="mail-outline" size={18} color={tint} />
            <TextInput
              placeholder="Enter your email…"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { color: inputText }]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>Invalid Email Address!!!</Text>
            </View>
          )}

          {networkError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>Não foi possível conectar ao servidor. Verifique sua conexão!</Text>
            </View>
          )}

          {badUserError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>Email inválido ou já cadastrado!</Text>
            </View>
          )}

          {userExistsError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>Este usuário já existe!</Text>
            </View>
          )}

          <Text style={[styles.label, { marginTop: 16, color: label }]}>Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
            <Ionicons name="lock-closed-outline" size={18} color={tint} />
            <TextInput
              placeholder="Enter your password…"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={secure1}
              autoCapitalize="none"
              style={[styles.input, { color: inputText }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure1(!secure1)}>
              {secure1 ? (
                <Ionicons name="eye-off-outline" size={18} color="#C4C4C4" />
              ) : (
                <Ionicons name="eye-outline" size={18} color="#C4C4C4" />
              )}
            </TouchableOpacity>
          </View>
            {passwordError && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
                <Text style={styles.errorText}>As senhas não conferem!</Text>
              </View>
            )}
            
            {badPasswordError && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
                <Text style={styles.errorText}>Senha muito fraca! Use pelo menos 8 caracteres.</Text>
              </View>
            )}
          <Text style={[styles.label, { marginTop: 16, color: label }]}> 
            Password Confirmation
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
            <Ionicons name="lock-closed-outline" size={18} color={tint} />
            <TextInput
              placeholder="Confirm your password…"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={secure2}
              autoCapitalize="none"
              style={[styles.input, { color: inputText }]}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity onPress={() => setSecure2(!secure2)}>
              {secure2 ? (
                <Ionicons name="eye-off-outline" size={18} color="#C4C4C4" />
              ) : (
                <Ionicons name="eye-outline" size={18} color="#C4C4C4" />
              )}
            </TouchableOpacity>
          </View>

          {passwordError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>As senhas não conferem!</Text>
            </View>
          )}

          {serverError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color="#f98b7d" />
              <Text style={styles.errorText}>Erro do servidor: {serverError}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpText}>
              {loading ? "Signing…" : "Sign Up"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: authText }]}>
              Already have an account?{" "}
              <Text
                style={[styles.footerLink, { color: authLink }]}
                onPress={() => navigation.navigate("Login")}
              >
                Sign In.
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardDismissableScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    fontWeight: "700",
    marginBottom: 8,
  },
  titleBold: { fontWeight: "800" },
  label: {
    marginTop: 24,
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "600",
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
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fde4df",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 6,
  },
  errorText: {
    marginLeft: 8,
    color: "#d14c34",
    fontSize: 13,
    fontWeight: "600",
  },
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A92E6",
    borderRadius: 999,
    paddingVertical: 14,
    marginTop: 24,
  },
  signUpText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  footer: { alignItems: "center", marginTop: 32 },
  footerText: { fontSize: 14, color: "#111827" },
  footerLink: { fontWeight: "600", color: "#6770E6" },
  scrollView: {
    flexGrow: 1,
  },
});
