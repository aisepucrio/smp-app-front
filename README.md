# BuddyMents

A cross-platform React-Native / Expo app for tracking team mental health and productivity

---

## 🖥 Prerequisites

| Tool     | Version   | Install                                  |
| -------- | --------- | ---------------------------------------- |
| Node     | **18+**   | <https://nodejs.org> or `nvm install 18` |
| Yarn     | **1.22+** | `npm i -g yarn`                          |
| Expo CLI | latest    | `yarn global add expo-cli`               |

---

## 🚀 Getting Started

```bash
# 1- Clone and install deps
 git clone git@github.com:aisepucrio/smp-app-front.git
 cd smp-app-front
 yarn

# 2- Run the dev server
 yarn start
```

### Useful Scripts

```bash
yarn lint      # eslint ts/tsx/js
```

## 🌍 Internationalization (i18n)

- Provider: `src/i18n` exports `I18nProvider` and `useTranslation()`.
- Locales: `src/i18n/locales/en.ts`, `src/i18n/locales/pt.ts`.
- Usage: `const { t } = useTranslation();` then `t('namespace.key', { name: 'Alice' })`.
- Persistence: selected language stored in `AsyncStorage` under `locale`; defaults to device locale (en/pt).
- UI: language selector available in `Settings` screen.
