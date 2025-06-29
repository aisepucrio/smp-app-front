import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { useTeams } from "../contexts/TeamsContext";

export default function CreateTeamScreen() {
  const [name, setName] = useState("");
  const { createTeam } = useTeams();

  const handleCreate = async () => {
    if (!name.trim()) return Alert.alert("Team name is required");
    try {
      await createTeam({ name: name.trim() });
      Alert.alert("Team created");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to create team");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Team name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
});
