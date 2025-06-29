import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TeamDto } from "../teams/types";

interface Props {
  team: TeamDto;
  onPress: () => void;
}

export default function TeamCard({ team, onPress }: Props) {
  const theme = useColorScheme() ?? "light";
  const themedStyles = styles(theme);

  return (
    <TouchableOpacity
      style={themedStyles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={themedStyles.avatar} />
      <ThemedText style={themedStyles.name} type="defaultSemiBold">
        {team.name}
      </ThemedText>
      <ThemedText style={themedStyles.count}>
        {team.membersCount} members
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = (theme: "light" | "dark") =>
  StyleSheet.create({
    card: {
      backgroundColor: Colors[theme].card,
      borderRadius: 12,
      padding: 16,
      width: "100%",
      shadowColor: "#000",
      shadowOpacity: theme === "light" ? 0.05 : 0.3,
      shadowRadius: 6,
      elevation: 2,
      marginBottom: 16,
    },
    avatar: {
      height: 48,
      width: 48,
      borderRadius: 24,
      backgroundColor: Colors[theme].tint,
      marginBottom: 8,
    },
    name: {
      fontSize: 18,
      color: Colors[theme].text,
    },
    count: {
      fontSize: 14,
      color: Colors[theme].icon,
    },
  });
