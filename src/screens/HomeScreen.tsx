import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TeamCard from "../components/TeamCard";
import { useAuth } from "../contexts/AuthContext";
import { useTeams } from "../contexts/TeamsContext";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? "light";
  const { user } = useAuth();
  const { teams, loading, refresh } = useTeams();

  const renderItem = useCallback(
    ({ item }: any) => (
      <TeamCard
        team={item}
        onPress={() => {
          /* navigate to team */
        }}
      />
    ),
    [],
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: Colors[theme].background },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="title" style={styles.greeting}>
          Hi, {user?.userName || "there"}
        </ThemedText>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons
            name="settings-outline"
            size={28}
            color={Colors[theme].icon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 40 },
        ]}
        refreshing={loading}
        onRefresh={refresh}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.createCard, { borderColor: Colors[theme].tint }]}
            activeOpacity={0.9}
            onPress={() => {
              // TODO navigate to CreateTeam screen
            }}
          >
            <Ionicons name="add" size={32} color={Colors[theme].tint} />
            <ThemedText
              style={[styles.createLabel, { color: Colors[theme].tint }]}
            >
              Create New Team
            </ThemedText>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
  },
  list: {
    paddingBottom: 40,
  },
  createCard: {
    marginTop: 12,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
  },
  createLabel: {
    marginTop: 8,
    color: Colors.light.tint,
  },
});
