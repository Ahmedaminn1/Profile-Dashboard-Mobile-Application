import {
  Almarai_400Regular,
  Almarai_700Bold,
  Almarai_300Light,
  Almarai_800ExtraBold,
} from '@expo-google-fonts/almarai'

// Font Assets
export const fontAssets = {
  Almarai_300Light,
  Almarai_400Regular,
  Almarai_700Bold,
  Almarai_800ExtraBold,
} as const

export const fontFamily = {
  sans: 'Almarai_400Regular',
  sansBold: 'Almarai_700Bold',
  sansLight: 'Almarai_300Light',
  sansExtraBold: 'Almarai_800ExtraBold',
} as const

// Font Size
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 17,
  base: 16,
  lg: 20,
  xl: 24,
  title: 32,
  subTitle: 22,
} as const

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  loose:  1.75,
} as const
