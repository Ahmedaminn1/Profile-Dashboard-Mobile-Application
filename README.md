# 📱 Profile Dashboard Mobile App

<div align="center">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Expo" src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Clean Code" src="https://img.shields.io/badge/Architecture-Clean_Code-success?style=for-the-badge" />
</div>

<br/>

A beautifully designed, highly interactive **Profile Dashboard Mobile Application** built with React Native and Expo Router. This project demonstrates best practices in **Clean Code Architecture**, modular component design, and scalable state management.

---

## ✨ Features

- **Modern & Responsive UI**: Carefully crafted themes (colors, typography, spacing) that scale gracefully across different devices.
- **Expo Router Navigation**: Seamless navigation using file-based routing including a Custom Drawer and Stack navigation.
- **Skills Management**: An interactive list to display professional skills, integrated with beautiful typography and `Ionicons`.
- **Dynamic Theming**: Support for custom themes utilizing React Context for smooth, app-wide UI consistency.
- **Optimized Performance**: Highly performant lists (`FlatList`) with proper separation of components and minimal re-renders.
- **RTL Support**: Built with Arabic/RTL (Right-to-Left) direction in mind, showcasing robust styling capabilities.

## 🏗️ Architecture & Clean Code

This application strictly adheres to the principles of **Clean Code Architecture**:
- **Separation of Concerns**: UI components, styling logic, theme tokens, and routing are strictly decoupled.
- **Modular Components**: Reusable components (`AppText`, `AppCard`, `AppButton`, `SkillsCard`, etc.) ensure DRY code and easy maintainability.
- **Centralized Theming**: Hardcoded values are eliminated. Spacing, colors, and typography are driven by a centralized `theme` directory (`spacing.ts`, `colors.ts`, `typography.ts`).
- **Type Safety**: Built robustly using **TypeScript** with strict interfaces (like `SkillItem`) preventing runtime errors and ensuring predictable code.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based Routing)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **State Management**: React Hooks & Context API

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and Expo CLI installed on your machine.
- Node.js (v18 or newer recommended)
- Expo Go app on your physical device, or an iOS/Android simulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ahmedaminn1/Profile-Dashboard-Mobile-Application.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd profile-dashboard
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run the app:**
   Open the **Expo Go** app on your phone and scan the QR code displayed in your terminal.

## 📂 Folder Structure

```text
src/
├── app/            # Expo Router pages (_layout.tsx, index.tsx, skills/, setting/)
├── components/     # Reusable UI components (AppText, AppCard, AppButton, etc.)
├── context/        # React Context providers (e.g., ThemeContext)
├── theme/          # Centralized theme tokens (colors, spacing, typography)
└── assets/         # Images, fonts, and static resources
```

## 👨‍💻 Author

Built with ❤️ by **[Ahmed Amin](https://github.com/Ahmedaminn1)**.  
Focused on delivering premium quality and clean architecture in software development.

---
⭐ Don't forget to leave a star if you like this repository!
