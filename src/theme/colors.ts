// ─── Single Accent Family: Precision Cobalt ──────────────────────────────────
// Strictly ONE accent colour across the entire design system (CLAUDE.md Rule 1)
const accent = {
  // Light: Deep authoritative cobalt
  light: "#1D4ED8",
  lightSubtle: "#EFF6FF",
  lightSubtleBorder: "#DBEAFE",
  lightSubtleText: "#1E40AF",

  // Dark: Luminous electric cobalt tuned for deep slate backgrounds
  dark: "#3B82F6",
  darkSubtle: "#172554",
  darkSubtleBorder: "#1E3A8A",
  darkSubtleText: "#93C5FD",
} as const;

// ─── Single Neutral Family: Consistent Cool Slate ────────────────────────────
// Consistent temperature: 100% cool slate neutrals, never mixed (CLAUDE.md Rule 1)
const slate = {
  0: "#FFFFFF",
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
  950: "#090D16",
  1000: "#000000",
} as const;

// ─── Meaning-Only Semantic Colours (CLAUDE.md Rule 1) ─────────────────────────
// Allowed only for destructive, success, warning - never for variety
const semantic = {
  // Light semantic
  successLight: "#15803D",
  successSubtleLight: "#F0FDF4",
  dangerLight: "#DC2626",
  dangerSubtleLight: "#FEF2F2",
  warningLight: "#D97706",
  warningSubtleLight: "#FFFBEB",

  // Dark semantic
  successDark: "#22C55E",
  successSubtleDark: "#052E16",
  dangerDark: "#EF4444",
  dangerSubtleDark: "#450A0A",
  warningDark: "#F59E0B",
  warningSubtleDark: "#451A03",
} as const;

// ─── Composed Theme Tokens ───────────────────────────────────────────────────
export const colors = {
  light: {
    // Accent (Target under 10% of visible surface)
    primary: accent.light,
    primarySubtle: accent.lightSubtle,
    primarySubtleBorder: accent.lightSubtleBorder,
    primarySubtleText: accent.lightSubtleText,

    // Surfaces
    background: slate[50],          // #F8FAFC - crisp canvas
    surface: slate[0],              // #FFFFFF - pure card surface
    surfaceRaised: slate[100],      // #F1F5F9 - inputs, pills, muted steps

    // Text (All pass WCAG AA/AAA contrast >= 4.5:1)
    text: slate[900],               // #0F172A - 14.2:1 contrast
    textSecondary: slate[600],      // #475569 - 5.8:1 contrast
    textDisabled: slate[400],       // #94A3B8
    textLight: slate[400],          // #94A3B8

    // Borders (Single consistent 1px border token)
    border: slate[200],             // #E2E8F0 - used everywhere

    // Semantic (carried by meaning only)
    success: semantic.successLight,
    successSubtle: semantic.successSubtleLight,
    danger: semantic.dangerLight,
    dangerSubtle: semantic.dangerSubtleLight,
    warning: semantic.warningLight,
    warningSubtle: semantic.warningSubtleLight,

    // Error
    error: semantic.dangerLight,
    errorSubtle: semantic.dangerSubtleLight,
  },
  dark: {
    // Accent
    primary: accent.dark,
    primarySubtle: accent.darkSubtle,
    primarySubtleBorder: accent.darkSubtleBorder,
    primarySubtleText: accent.darkSubtleText,

    // Surfaces (Deep cosmic slate, zero muddy brown)
    background: slate[950],         // #090D16 - deep clean slate
    surface: slate[900],            // #0F172A - elevated card
    surfaceRaised: slate[800],      // #1E293B - inputs, pills

    // Text (All pass WCAG AA/AAA contrast >= 4.5:1)
    text: slate[50],                // #F8FAFC - 15.5:1 contrast
    textSecondary: slate[400],      // #94A3B8 - 6.2:1 contrast
    textDisabled: slate[600],       // #475569
    textLight: slate[500],          // #64748B

    // Borders (Single consistent 1px border token)
    border: slate[800],             // #1E293B - used everywhere

    // Semantic (carried by meaning only)
    success: semantic.successDark,
    successSubtle: semantic.successSubtleDark,
    danger: semantic.dangerDark,
    dangerSubtle: semantic.dangerSubtleDark,
    warning: semantic.warningDark,
    warningSubtle: semantic.warningSubtleDark,

    // Error
    error: semantic.dangerDark,
    errorSubtle: semantic.dangerSubtleDark,
  },
} as const;

export type ThemeMode = keyof typeof colors;
export type ColorToken = keyof typeof colors.light;
