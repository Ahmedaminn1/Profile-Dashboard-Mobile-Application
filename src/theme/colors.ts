// ─── Light Accent — Amber / Gold ─────────────────────────────────────────────
const lightAccent = {
  default: "#F59E0B", // primary actions, active states
  subtle: "#FEF3C7", // tinted backgrounds
  subtleText: "#92400E", // text on subtle bg
} as const;

// ─── Dark Accent — Emerald Green ─────────────────────────────────────────────
const darkAccent = {
  default: "#34D399", // primary actions, active states
  subtle: "#064E3B", // tinted backgrounds
  subtleText: "#6EE7B7", // text on subtle bg
} as const;

// ─── Neutrals ─────────────────────────────────────────────────────────────────
const neutral = {
  0: "#FFFFFF",
  50: "#FAFAF7", // creamy white — light bg
  100: "#F3F1EC",
  200: "#E5E2DA",
  300: "#CCC8BE",
  400: "#9C9890",
  500: "#6E6A63",
  600: "#4B4843",
  700: "#2E2C29",
  800: "#1C1A17",
  900: "#0D1117", // GitHub-style dark — dark bg
  1000: "#000000",
} as const;

// ─── Semantic ─────────────────────────────────────────────────────────────────
const semantic = {
  // Light semantic
  successLight: "#16A34A",
  successSubtleLight: "#DCFCE7",
  dangerLight: "#DC2626",
  dangerSubtleLight: "#FEE2E2",
  warningLight: "#D97706",
  warningSubtleLight: "#FEF3C7",

  // Dark semantic
  successDark: "#4ADE80",
  successSubtleDark: "#14532D",
  dangerDark: "#F87171",
  dangerSubtleDark: "#7F1D1D",
  warningDark: "#FCD34D",
  warningSubtleDark: "#78350F",
} as const;

// ─── Composed theme tokens ─────────────────────────────────────────────────────
export const colors = {
  light: {
    // Accent
    primary: lightAccent.default,
    primarySubtle: lightAccent.subtle,

    // Surfaces
    background: neutral[50], // كريمي
    surface: neutral[0], // أبيض نقي للكارد
    surfaceRaised: neutral[100], // overlays / modals

    // Text
    text: neutral[900],
    textSecondary: neutral[500],
    textDisabled: neutral[400],
    textLight: neutral[400],

    // Borders
    border: neutral[200],

    // Semantic
    success: semantic.successLight,
    successSubtle: semantic.successSubtleLight,
    danger: semantic.dangerLight,
    dangerSubtle: semantic.dangerSubtleLight,
    warning: semantic.warningLight,
    warningSubtle: semantic.warningSubtleLight,
  },
  dark: {
    // Accent
    primary: darkAccent.default,
    primarySubtle: darkAccent.subtle,

    // Surfaces
    background: neutral[900], // #0D1117 GitHub style
    surface: neutral[800], // #1C1A17
    surfaceRaised: neutral[700], // #2E2C29

    // Text
    text: neutral[50],
    textSecondary: neutral[400],
    textDisabled: neutral[600],
    textLight: neutral[400],

    // Borders
    border: neutral[700],

    // Semantic
    success: semantic.successDark,
    successSubtle: semantic.successSubtleDark,
    danger: semantic.dangerDark,
    dangerSubtle: semantic.dangerSubtleDark,
    warning: semantic.warningDark,
    warningSubtle: semantic.warningSubtleDark,
  },
} as const;

export type ThemeMode = keyof typeof colors;
export type ColorToken = keyof typeof colors.light;
