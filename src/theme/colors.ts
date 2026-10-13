// ─── Light Accent — Indigo ────────────────────────────────────────────────────
const lightAccent = {
  default: '#4F46E5', // Indigo-600
  subtle:  '#EEF2FF', // Indigo-50
} as const

// ─── Dark Accent — Indigo (lighter for contrast) ───────────────────────────────
const darkAccent = {
  default: '#818CF8', // Indigo-400
  subtle:  '#1E1B4B', // Indigo-950
} as const

// ─── Slate Neutrals ───────────────────────────────────────────────────────────
const slate = {
  0:    '#FFFFFF',
  50:   '#F8FAFC',
  100:  '#F1F5F9',
  200:  '#E2E8F0',
  300:  '#CBD5E1',
  400:  '#94A3B8',
  500:  '#64748B',
  600:  '#475569',
  700:  '#334155',
  800:  '#1E293B',
  900:  '#0F172A',
  1000: '#000000',
} as const

// ─── Semantic ─────────────────────────────────────────────────────────────────
const semantic = {
  // Light
  successLight:       '#16A34A',
  successSubtleLight: '#DCFCE7',
  dangerLight:        '#DC2626',
  dangerSubtleLight:  '#FEE2E2',
  warningLight:       '#D97706',
  warningSubtleLight: '#FEF3C7',

  // Dark
  successDark:       '#4ADE80',
  successSubtleDark: '#14532D',
  dangerDark:        '#F87171',
  dangerSubtleDark:  '#7F1D1D',
  warningDark:       '#FCD34D',
  warningSubtleDark: '#78350F',
} as const

// ─── Composed theme tokens ─────────────────────────────────────────────────────
export const colors = {
  light: {
    // Accent
    primary:       lightAccent.default,
    primarySubtle: lightAccent.subtle,

    // Surfaces
    background:    slate[0],    // أبيض نقي
    surface:       slate[50],   // رمادي ناعم جداً
    surfaceRaised: slate[100],  // overlays / modals

    // Text
    text:          slate[900],
    textSecondary: slate[500],
    textDisabled:  slate[400],
    textLight:     slate[400],

    // Borders
    border:        slate[200],

    // Semantic
    success:       semantic.successLight,
    successSubtle: semantic.successSubtleLight,
    danger:        semantic.dangerLight,
    dangerSubtle:  semantic.dangerSubtleLight,
    warning:       semantic.warningLight,
    warningSubtle: semantic.warningSubtleLight,
  },
  dark: {
    // Accent
    primary:       darkAccent.default,
    primarySubtle: darkAccent.subtle,

    // Surfaces
    background:    slate[900],  // #0F172A — Slate داكن
    surface:       slate[800],  // #1E293B
    surfaceRaised: slate[700],  // #334155

    // Text
    text:          slate[50],
    textSecondary: slate[400],
    textDisabled:  slate[600],
    textLight:     slate[400],

    // Borders
    border:        slate[700],

    // Semantic
    success:       semantic.successDark,
    successSubtle: semantic.successSubtleDark,
    danger:        semantic.dangerDark,
    dangerSubtle:  semantic.dangerSubtleDark,
    warning:       semantic.warningDark,
    warningSubtle: semantic.warningSubtleDark,
  },
} as const

export type ThemeMode = keyof typeof colors
export type ColorToken = keyof typeof colors.light