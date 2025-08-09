import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "@/src/screens/LoadingScreen";

import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { TeamsProvider } from "@/src/contexts/TeamsContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import MainTabs from "@/src/navigation/MainTabs";
import LoginScreen from "@/src/screens/LoginScreen";
import RegisterScreen from "@/src/screens/RegisterScreen";
import WelcomeScreen from "@/src/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  const startRef = useRef(Date.now());
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (!loading && !splashDone) {
      const elapsed = Date.now() - startRef.current;
      const cycleMs = 2000;
      const remaining = cycleMs - (elapsed % cycleMs);
      const timer = setTimeout(() => setSplashDone(true), remaining);
      return () => clearTimeout(timer);
    }
  }, [loading, splashDone]);

  if (loading || !splashDone) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TeamsProvider>
          <RootNavigator />
        </TeamsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
