import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import Svg, {Path} from "react-native-svg";
import {Eye, EyeOff, Mail, LockKeyhole, ArrowRight, AlertTriangle} from "lucide-react-native";
import {Ionicons} from "@expo/vector-icons";
import {useAuth} from "../contexts/AuthContext";

export default function RegisterScreen({navigation}: any) {
    const {register} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [secure1, setSecure1] = useState(true);
    const [secure2, setSecure2] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSignUp = async () => {
        const emailValid = /.+@.+\..+/.test(email);
        setEmailError(!emailValid);
        if (!emailValid || password !== confirm) return;
        try {
            setLoading(true);
            await register(email, email.split("@")[0], password);
        } catch {
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Svg width="100%" height="100%" viewBox="0 5 390 10" style={styles.headerSvg}>
                        <Path d="M0 0 H390 V110 Q187.5 180 0 110 Z" fill="#6770E6"/>
                    </Svg>
                    <View style={styles.headerImageWrapper}>
                        <Image source={require("../assets/owl.png")} style={styles.headerImage} resizeMode="contain"/>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={styles.title}>
                        Sign Up{"\n"}
                        <Text style={styles.titleBold}>BuddyMents</Text>
                    </Text>

                    <Text style={styles.label}>Email Address</Text>
                    <View style={[styles.inputContainer, emailError && {borderWidth: 2, borderColor: "#f98b7d"}]}>
                        <Mail size={18} stroke="#6770E6"/>
                        <TextInput
                            placeholder="Enter your email…"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {emailError && (
                        <View style={styles.errorRow}>
                            <AlertTriangle size={16} color="#f98b7d"/>
                            <Text style={styles.errorText}>Invalid Email Address!!!</Text>
                        </View>
                    )}

                    <Text style={[styles.label, {marginTop: 16}]}>Password</Text>
                    <View style={styles.inputContainer}>
                        <LockKeyhole size={18} stroke="#6770E6"/>
                        <TextInput
                            placeholder="Enter your password…"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={secure1}
                            autoCapitalize="none"
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setSecure1(!secure1)}>
                            {secure1 ? <EyeOff size={18} stroke="#C4C4C4"/> : <Eye size={18} stroke="#C4C4C4"/>}
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.label, {marginTop: 16}]}>Password Confirmation</Text>
                    <View style={styles.inputContainer}>
                        <LockKeyhole size={18} stroke="#6770E6"/>
                        <TextInput
                            placeholder="Confirm your password…"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={secure2}
                            autoCapitalize="none"
                            style={styles.input}
                            value={confirm}
                            onChangeText={setConfirm}
                        />
                        <TouchableOpacity onPress={() => setSecure2(!secure2)}>
                            {secure2 ? <EyeOff size={18} stroke="#C4C4C4"/> : <Eye size={18} stroke="#C4C4C4"/>}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8} onPress={handleSignUp}
                                      disabled={loading}>
                        <Text style={styles.signUpText}>{loading ? "Signing…" : "Sign Up"}</Text>
                        <ArrowRight size={20} color="#fff" style={{marginLeft: 8}}/>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account? <Text style={styles.footerLink}
                                                           onPress={() => navigation.navigate("Login")}>Sign In.</Text>
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#F6C758"},
    header: {width: "100%", height: 180, overflow: "hidden"},
    headerSvg: {position: "absolute", top: 0, left: 0},
    headerImageWrapper: {flex: 1, alignItems: "center", justifyContent: "center", marginTop: 16},
    headerImage: {height: 80, width: 128},
    body: {flex: 1, paddingHorizontal: 24, marginTop: 16},
    title: {textAlign: "center", fontSize: 28, fontWeight: "700", color: "#111827", marginBottom: 8},
    titleBold: {fontWeight: "800"},
    label: {
        marginTop: 24,
        marginBottom: 4,
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        letterSpacing: 0.5,
        textTransform: "uppercase"
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
        shadowOffset: {width: 0, height: 2},
        elevation: 2
    },
    input: {flex: 1, marginLeft: 8, fontSize: 16, color: "#111827"},
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fde4df",
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 6
    },
    errorText: {marginLeft: 8, color: "#d14c34", fontSize: 13, fontWeight: "600"},
    signUpButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8A92E6",
        borderRadius: 999,
        paddingVertical: 14,
        marginTop: 24
    },
    signUpText: {color: "#FFFFFF", fontSize: 16, fontWeight: "600"},
    footer: {alignItems: "center", marginTop: 32},
    footerText: {fontSize: 14, color: "#111827"},
    footerLink: {fontWeight: "600", color: "#6770E6"},
});