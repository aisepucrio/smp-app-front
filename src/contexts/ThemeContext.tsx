import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

export type ThemeVariant = "light" | "dark";
type ThemePreference = ThemeVariant | "system";

interface ThemeContextValue {
  theme: ThemeVariant;
  toggleTheme: () => void;
}

const STORAGE_KEY = "themePreference";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<ThemeVariant>((Appearance.getColorScheme() ?? "light") as ThemeVariant);
  const mounted = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setPreference(saved);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const updateFromSystem = (scheme: ColorSchemeName) => {
      setTheme(((scheme ?? "light") as ThemeVariant));
    };

    if (preference === "system") {
      updateFromSystem(Appearance.getColorScheme());
      const sub = Appearance.addChangeListener(({ colorScheme }: any) => {
        updateFromSystem(colorScheme);
      });
      return () => sub.remove();
    } else {
      setTheme(preference);
    }
  }, [preference]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, preference).catch(() => {});
  }, [preference]);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      if (prev === "system") {
        const system = Appearance.getColorScheme() ?? "light";
        return (system === "light" ? "dark" : "light") as ThemePreference;
      }
      return prev === "light" ? "dark" : "light";
    });
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
