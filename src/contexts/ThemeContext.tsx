import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

export type ThemeVariant = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeVariant;
  toggleTheme: () => void;
}

const STORAGE_KEY = "themePreference";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = Appearance.getColorScheme() ?? "light";
  const [theme, setTheme] = useState<ThemeVariant>(systemScheme);

  // Hydrate stored preference
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {});
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
