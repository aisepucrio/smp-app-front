import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en';
import pt from './locales/pt';

type Locale = 'en' | 'pt';

const RESOURCES = {
  en,
  pt,
};

type Resources = typeof RESOURCES;
type TranslationValues = string | number | boolean | null | undefined;

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc: any, key: string) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

function interpolate(template: string, params?: Record<string, TranslationValues>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    const v = params[k];
    return v === undefined || v === null ? '' : String(v);
  });
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, params?: Record<string, TranslationValues>) => string;
  languages: { code: Locale; label: string }[];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'locale';

function detectDefaultLocale(): Locale {
  try {
    const sys = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    if (sys.startsWith('pt')) return 'pt';
    return 'en';
  } catch {
    return 'en';
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectDefaultLocale());

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'pt') setLocaleState(stored);
      } catch {}
    })();
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  };

  const t = useMemo(() => {
    const dict = RESOURCES[locale];
    return (key: string, params?: Record<string, TranslationValues>) => {
      const raw = getByPath(dict, key) ?? key;
      if (typeof raw === 'string') return interpolate(raw, params);
      return key;
    };
  }, [locale]);

  const languages = useMemo(
    () => [
      { code: 'en' as const, label: RESOURCES[locale === 'en' ? 'en' : 'en'].settings.english },
      { code: 'pt' as const, label: RESOURCES[locale === 'pt' ? 'pt' : 'pt'].settings.portuguese },
    ],
    [locale],
  );

  const value: I18nContextValue = { locale, setLocale, t, languages };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}

