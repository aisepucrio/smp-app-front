import ArrowBackCircle from "@/components/ui/ArrowBackCircle";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/src/contexts/AuthContext";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useTranslation } from "@/src/i18n";

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { theme: currentTheme, toggleTheme } = useTheme();
  const { t, locale, setLocale, languages } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useColorScheme() ?? "light";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      Alert.alert(t('settings.logoutFailedTitle'), err.message || t('settings.unexpectedError'));
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <View style={[styles.card, { backgroundColor: Colors[theme].card }]}>
        <View style={styles.headerRow}>
          <ArrowBackCircle
            size={40}
            color={Colors[theme].icon}
            onPress={() => navigation.goBack()}
          />
          <ThemedText type="title" style={styles.title}>{t('settings.title')}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.label, { color: Colors[theme].icon }]}>{t('settings.account')}</ThemedText>
          <ThemedText>{user?.email}</ThemedText>
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={[styles.label, { color: Colors[theme].icon }]}>{t('settings.darkMode')}</ThemedText>
          <Switch
            value={currentTheme === "dark"}
            onValueChange={toggleTheme}
            thumbColor={Colors[theme].tint}
            trackColor={{ false: "#ccc", true: Colors[theme].tint }}
          />
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={[styles.label, { color: Colors[theme].icon }]}>{t('settings.language')}</ThemedText>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {languages.map((l) => (
              <TouchableOpacity
                key={l.code}
                onPress={() => setLocale(l.code)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: l.code === locale ? Colors[theme].tint : '#ccc',
                }}
                activeOpacity={0.7}
              >
                <ThemedText style={{ color: l.code === locale ? Colors[theme].tint : Colors[theme].text }}>
                  {l.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: Colors[theme].tint }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <ThemedText style={styles.logoutText}>{t('settings.logout')}</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    marginTop: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 24,
    gap: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  section: {
    gap: 4,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 14,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
