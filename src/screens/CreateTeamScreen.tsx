import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import ArrowBackCircle from "@/components/ui/ArrowBackCircle";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import invitationsApi from "../api/invitationsApi";
import usersApi from "../api/usersApi";
import { useAuth } from "../contexts/AuthContext";
import { useTeams } from "../contexts/TeamsContext";

export default function CreateTeamScreen() {
  const navigation = useNavigation<any>();
  const { accessToken } = useAuth();
  const theme = useColorScheme() ?? "light";

  const [name, setName] = useState<string>("");
  type InviteField = { value: string; status: "idle" | "loading" | "found" | "notfound" };
  const [invites, setInvites] = useState<InviteField[]>([{ value: "", status: "idle" }]);
  const [submitting, setSubmitting] = useState(false);
  const { createTeam, refresh } = useTeams();

  const handleCreate = async () => {
    if (!name.trim()) return Alert.alert("Team name is required");
    const filteredInvites = invites.map((e) => e.value.trim()).filter(Boolean);
    setSubmitting(true);
    try {
      const team = await createTeam({ name: name.trim() });

      if (filteredInvites.length && accessToken) {
        await Promise.all(
          filteredInvites.map((email) =>
            invitationsApi.createInvitation(accessToken, {
              teamId: team.id,
              email,
            }),
          ),
        );
      }

      await refresh();
      Alert.alert("Success", "Team created");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to create team");
    } finally {
      setSubmitting(false);
    }
  };

  const themedStyles = styles(theme);
  const successColor = theme === "light" ? "#34C759" : "#30D158";

  return (
    <SafeAreaView
      style={[
        themedStyles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      <View style={[themedStyles.card, { backgroundColor: Colors[theme].card }]}>
        <View style={themedStyles.headerRow}>
          <ArrowBackCircle
            size={40}
            color={Colors[theme].icon}
            onPress={() => navigation.goBack()}
          />
          <ThemedText type="title" style={themedStyles.title}>
            Create Team
          </ThemedText>
        </View>

        <ThemedText style={themedStyles.label}>Team Name</ThemedText>
        <TextInput
          placeholder="e.g. Avengers"
          value={name}
          onChangeText={setName}
          style={themedStyles.input}
          placeholderTextColor="#999"
        />

        <ThemedText style={[themedStyles.label, { marginTop: 16 }]}>Invite members</ThemedText>
        {invites.map((invite, index) => (
          <View key={index} style={themedStyles.inviteRow}>
            <TextInput
              style={[themedStyles.input, { flex: 1 }]}
              placeholder="Email or Username"
              placeholderTextColor="#999"
              value={invite.value}
              onChangeText={(text) => {
                const copy = [...invites];
                copy[index] = { ...copy[index], value: text, status: "idle" };
                setInvites(copy);
              }}
              onBlur={async () => {
                const query = invite.value.trim();
                if (!query || !accessToken) return;

                setInvites((prev) => {
                  const next = [...prev];
                  next[index] = { ...next[index], status: "loading" };
                  return next;
                });

                try {
                  await usersApi.lookupUser(accessToken, query);
                  setInvites((prev) => {
                    const next = [...prev];
                    if (next[index].value.trim() === query) {
                      next[index] = { ...next[index], status: "found" };
                    }
                    return next;
                  });
                } catch {
                  setInvites((prev) => {
                    const next = [...prev];
                    if (next[index].value.trim() === query) {
                      next[index] = { ...next[index], status: "notfound" };
                    }
                    return next;
                  });
                }
              }}
            />
            {invite.status === "loading" && (
              <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
            )}
            {invite.status === "found" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={successColor}
              />
            )}
            {invite.status === "notfound" && (
              <Ionicons name="alert-circle" size={20} color="red" />
            )}
            {invites.length > 1 && (
              <TouchableOpacity
                onPress={() => {
                  const copy = invites.filter((_, i) => i !== index);
                  setInvites(copy);
                }}
                style={themedStyles.removeBtn}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={Colors[theme].icon}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={() => setInvites((prev) => [...prev, { value: "", status: "idle" }])}
          style={themedStyles.addInviteBtn}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add-circle-outline"
            size={20}
            color={Colors[theme].tint}
          />
          <ThemedText style={{ color: Colors[theme].tint }}>
            Add another
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[themedStyles.createBtn, { backgroundColor: Colors[theme].tint }]}
          onPress={handleCreate}
          activeOpacity={0.8}
          disabled={submitting}
        >
          <ThemedText style={themedStyles.createText}>
            {submitting ? "Creating..." : "Create"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
    },
    card: {
      marginTop: 24,
      borderRadius: 16,
      padding: 24,
      gap: 16,
      shadowColor: "#000",
      shadowOpacity: theme === "light" ? 0.05 : 0.3,
      shadowRadius: 6,
      elevation: 2,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
    },
    label: {
      fontWeight: "600",
      fontSize: 14,
      color: Colors[theme].icon,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 8,
      color: theme === "light" ? "#1F2937" : Colors[theme].text,
      backgroundColor: theme === "light" ? "#fff" : "#2A2A2A",
    },
    inviteRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    removeBtn: {
      padding: 8,
    },
    addInviteBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
    },
    createBtn: {
      marginTop: 24,
      borderRadius: 999,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    createText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
  });
