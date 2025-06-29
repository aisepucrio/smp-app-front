import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import RotatingDots from "../components/RotatingDots";

export default function LoadingScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spinnerWrapper}>
                <RotatingDots size={600} dotRadius={60} durationMs={2000} />
                <Text style={styles.label}>/// Loading ///</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7287D9",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },
    spinnerWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 