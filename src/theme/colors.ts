const accent = {
  default:  '#2563EB', // primary actions, active states
  subtle:   '#DBEAFE', // light-mode tinted backgrounds (use sparingly)
  subtleDark: '#1E3A5F', // dark-mode tinted backgrounds (use sparingly)
} as const

// ─── Neutrals — cool grey, consistent temperature ───────────────────────────
const neutral = {
  0:   '#FFFFFF',
  50:  '#F8F9FA',
  100: '#F1F3F5',
  200: '#E8EAED',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
  1000: '#000000',
} as const

// ─── Semantic — meaning only, never decoration ───────────────────────────────
const semantic = {
  success:        '#16A34A',
  successSubtle:  '#DCFCE7',
  danger:         '#DC2626',
  dangerSubtle:   '#FEE2E2',
  warning:        '#D97706',
  warningSubtle:  '#FEF3C7',
  grayLight : '#7B7B7B'
} as const

// ─── Composed theme tokens ───────────────────────────────────────────────────
export const colors = {
  light: {
    // Accent
    primary:          accent.default,
    primarySubtle:    accent.subtle,

    // Surfaces
    background:       neutral[0],
    surface:          neutral[50],
    surfaceRaised:    neutral[100], // use only for true overlays (modals, popovers)

    // Text
    text:             neutral[900],
    textSecondary:    neutral[500],
    textDisabled:     neutral[400],
    textLight : semantic.grayLight,

    // Borders
    border:           neutral[200],

    // Semantic
    success:          semantic.success,
    successSubtle:    semantic.successSubtle,
    danger:           semantic.danger,
    dangerSubtle:     semantic.dangerSubtle,
    warning:          semantic.warning,
    warningSubtle:    semantic.warningSubtle,
  },
  dark: {
    // Accent
    primary:          '#3B82F6', // slightly lighter for contrast on dark bg
    primarySubtle:    accent.subtleDark,

    // Surfaces
    background:       neutral[900],
    surface:          neutral[800],
    surfaceRaised:    neutral[700],

    // Text
    text:             neutral[50],
    textSecondary:    neutral[400],
    textDisabled:     neutral[600],

    // Borders
    border:           neutral[700],

    // Semantic
    success:          '#4ADE80',
    successSubtle:    '#14532D',
    danger:           '#F87171',
    dangerSubtle:     '#7F1D1D',
    warning:          '#FCD34D',
    warningSubtle:    '#78350F',
  },
} as const

export type ThemeMode = keyof typeof colors
export type ColorToken = keyof typeof colors.light