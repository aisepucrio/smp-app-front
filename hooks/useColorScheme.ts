import { useColorScheme as useRNColorScheme } from "react-native";
import type { ThemeVariant } from "../src/contexts/ThemeContext";

export function useColorScheme(): ThemeVariant {
  let ctxValue: any;
  try {
    const { useTheme } = require("../src/contexts/ThemeContext");
    ctxValue = useTheme?.();
  } catch {}

  return ctxValue?.theme ?? useRNColorScheme() ?? "light";
}
