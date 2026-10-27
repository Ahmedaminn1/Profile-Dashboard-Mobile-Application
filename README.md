# 📱 Profile Dashboard — React Native Mobile App

A modern, fully-featured **Profile Dashboard** mobile application built with **React Native** and **Expo**. The app showcases a professional developer profile with skills management, theme customization, multi-language support, and comprehensive settings — all wrapped in a clean, accessible design system.

---

## ✨ Features Overview

### 🔐 Authentication System
- **Login screen** with username & password fields
- **Secure token storage** using `expo-secure-store`
- **Session persistence** — auto-restores login state on app restart
- **Auth context** with global state management (`AuthProvider` / `useAuth`)
- **API integration** with [DummyJSON Auth API](https://dummyjson.com/docs/auth) for real login flow
- **Logout** functionality from drawer & settings

### 🏠 Dashboard (Home Screen)
- **User profile section** with avatar, name, email/role
- **Statistics cards** — Projects, Skills count, Tasks
- **About Me card** — personal bio/description
- **Quick Actions** — shortcut buttons to Skills & Settings
- **Drawer navigation toggle** from the top bar
- **Notification badge** indicator

### 🛠 Skills Management
- **Skills list** displayed with `FlatList` for performant scrolling
- **Add Skill modal** — bottom sheet with:
  - Skill name text input
  - Level picker (Beginner / Intermediate / Advanced) — chip selection
  - Badge picker (Good / Very Good / Professional / Expert) — chip selection
- **Dynamic skill count** reflected across the app
- **Skills context** (`SkillsProvider` / `useSkills`) for global CRUD state
- **Empty state** with icon when no skills exist
- **12 pre-loaded skills** (React, Next.js, TypeScript, React Native, etc.)

### ⚙️ Settings
- **Settings hub** with cards linking to sub-screens:
  - 🧑 **Account** — view & edit profile info (name, email, phone, location) with inline editing
  - 🔔 **Notifications** — toggle push, email, reminders, updates, sound & vibration
  - 🔒 **Privacy** — toggle privacy settings with switches
  - ❓ **Help & FAQ** — expandable FAQ accordion + contact/support links
- **Theme selector** — Light / Dark / System with `ThemeButton` toggle
- **Language selector** — Arabic / English toggle buttons
- **Logout button**

### 🌗 Theme System (Dark / Light / System)
- **3 theme modes**: Light, Dark, System (follows device preference)
- **Theme persistence** via `AsyncStorage`
- **Comprehensive design tokens**:
  - Accent colors (Cobalt Blue family)
  - Surface/background hierarchy (3-tier)
  - Semantic colors (success, danger, warning)
  - Text colors with **WCAG AA/AAA contrast compliance**
  - Single consistent border token
- **Quick light/dark toggle** in the top bar
- **Full theme toggle** in Settings with visual buttons
- **`ThemeProvider` / `useTheme` context** for app-wide reactivity

### 🌐 Internationalization (i18n) — Arabic & English
- **Full bilingual support** (Arabic 🇸🇦 & English 🇬🇧)
- **RTL/LTR layout flipping** — all rows, alignments, and text directions adapt
- **Language persistence** via `AsyncStorage`
- **Powered by** `i18next` + `react-i18next`
- **Toggle from**:
  - Login screen (globe button)
  - Home screen top bar
  - Settings screen (language card)
- **Localized content**: all labels, buttons, placeholders, alerts, skill levels & badges

### 🧭 Drawer Navigation
- **Slide-out drawer** with:
  - User avatar, name, and email
  - Navigation items: Dashboard, Skills, Settings (with icons)
  - Logout button
  - Social media links (GitHub, LinkedIn, Instagram)
  - Footer with copyright text
- **RTL-aware** — drawer opens from right in Arabic, left in English
- **Custom drawer content** component (`DrawerContent`)

### 🧩 Reusable Component Library

| Component | Description |
|---|---|
| `AppSafeAreaView` | Safe-area wrapper with StatusBar management |
| `AppCard` | Surface card with 1px border, no drop shadows |
| `AppButton` | Multi-variant button (primary, outlined, danger, success, warning) with icon support |
| `AppText` | Typography component with variants (title, subTitle, body, caption, button) |
| `Avatar` | Circular avatar with image or initials fallback |
| `StatCard` | Statistic display card with icon, label, and value |
| `SkillCard` | Skill item card with icon, title, level, and badge |
| `ThemeButton` | Selectable theme option button with icon |
| `SettingScreenHeader` | Reusable header for settings sub-screens |
| `DrawerContent` | Custom drawer navigation content |
| `LoginScreen` | Full login form component |

---

## 🏗 Tech Stack

| Technology | Purpose |
|---|---|
| **React Native** `0.86` | Cross-platform mobile framework |
| **Expo** `~57.0` | Development platform & tooling |
| **Expo Router** | File-based routing with typed routes |
| **TypeScript** `~6.0` | Static type safety |
| **React** `19.2` | UI library |
| **react-native-gesture-handler** | Touch & gesture handling |
| **react-native-reanimated** `4.5` | Animations engine |
| **react-native-screens** | Native screen containers |
| **react-native-safe-area-context** | Safe area insets |
| **@react-navigation/drawer** | Drawer navigation |
| **expo-secure-store** | Encrypted credential storage |
| **@react-native-async-storage/async-storage** | Persistent key-value storage |
| **i18next** + **react-i18next** | Internationalization framework |
| **@expo-google-fonts/almarai** | Arabic-optimized Google Font (4 weights) |
| **@expo/vector-icons** (Ionicons) | Icon library |
| **expo-font** | Custom font loading |
| **expo-image** | Optimized image component |
| **expo-splash-screen** | Splash screen management |
| **expo-linking** | Deep linking & external URL opening |
| **react-native-web** | Web platform support |
| **React Compiler** (experimental) | Automatic memoization |

---

## 📁 Project Structure

```
src/
├── app/                          # Expo Router — file-based screens
│   ├── _layout.tsx               # Root layout (providers + drawer)
│   ├── index.tsx                  # Home / Dashboard screen
│   ├── skills/
│   │   └── index.tsx             # Skills list + add modal
│   └── setting/
│       ├── _layout.tsx           # Settings stack layout
│       ├── index.tsx             # Settings hub
│       ├── account.tsx           # Account settings
│       ├── notifications.tsx     # Notification preferences
│       ├── privacy.tsx           # Privacy settings
│       └── help.tsx              # Help & FAQ
├── components/                   # Reusable UI components
│   ├── AppButton/
│   ├── AppCard/
│   ├── AppSafeAreaView/
│   ├── AppText/
│   ├── Avatar/
│   ├── DrawerContent/
│   ├── LoginScreen/
│   ├── SettingScreenHeader/
│   ├── SkillCard/
│   ├── StatCard/
│   └── ThemeButton/
├── context/                      # React Context providers
│   ├── AuthContext.tsx            # Authentication state
│   ├── ThemeContext.tsx           # Theme mode & colors
│   └── SkillsContext.tsx         # Skills CRUD state
├── services/
│   └── authService.ts            # API client for authentication
├── i18n/
│   ├── i18n.ts                   # i18next configuration
│   └── locales/
│       ├── ar.ts                 # Arabic translations
│       └── en.ts                 # English translations
├── theme/                        # Design system tokens
│   ├── colors.ts                 # Light/dark color palettes
│   ├── spacing.ts                # Spacing & border-radius scale
│   └── typography.ts             # Font families, sizes, line heights
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme.ts
├── constants/
│   └── theme.ts                  # Theme constants
└── global.css                    # Global styles
```

---

## 🎨 Design System

### Color Palette
- **Single accent family**: Precision Cobalt (`#1D4ED8` light / `#3B82F6` dark)
- **Neutral family**: Cool Slate scale (50–950)
- **Semantic colors**: Success (green), Danger (red), Warning (amber) — used only for meaning
- **WCAG AA/AAA compliant** text contrast ratios

### Typography
- **Font**: [Almarai](https://fonts.google.com/specimen/Almarai) (Google Font — Arabic-optimized)
- **Weights**: Light (300), Regular (400), Bold (700), ExtraBold (800)
- **Scale**: `12 / 14 / 16 / 20 / 24 / 32 / 48`px

### Spacing
- **4px grid system**: `xs(4) / sm(8) / md(16) / lg(24) / xl(32) / xxl(40)`
- **Border radius**: `none(0) / sm(4) / md(8) / lg(12) / xl(16) / full(9999)`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for emulators) or Expo Go app

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmedaminn1/Profile-Dashboard-Mobile-Application.git

# Navigate to the project
cd profile-dashboard

# Install dependencies
npm install

# Start the development server
npm run start
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Start | `npm run start` | Launch Expo dev server |
| Android | `npm run android` | Run on Android emulator/device |
| iOS | `npm run ios` | Run on iOS simulator/device |
| Web | `npm run web` | Run in web browser |
| Lint | `npm run lint` | Run ESLint |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ahmed Amin**

- GitHub: [@Ahmedaminn1](https://github.com/Ahmedaminn1)
- LinkedIn: [ahmed-aminn](https://www.linkedin.com/in/ahmed-aminn/)
