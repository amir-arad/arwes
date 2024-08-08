import type { Config } from 'tailwindcss'
import { theme } from './theme'

const createPalette = (colorFn: (i: number) => string, length: number): Record<string, string> =>
  Array(length)
    .fill(null)
    .map((_, i) => ({ [i]: colorFn(i) }))
    .reduce((t, i) => ({ ...t, ...i }), {})

export const tailwind: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: theme.fontFamily,
      fontSize: {
        'size-0': '3rem',
        'size-1': '2.5rem',
        'size-2': '2.25rem',
        'size-3': '2rem',
        'size-4': '1.75rem',
        'size-5': '1.5rem',
        'size-6': '1.3125rem',
        'size-7': '1.125rem',
        'size-8': '1rem',
        'size-9': '0.875rem',
        'size-10': '0.75rem',
        'size-11': '0.625rem',
        'size-12': '0.5rem'
      },
      screens: (theme.breakpoints.settings as Array<{ key: string; value: string }>)
        .map(({ key, value }) => ({ [key]: value }))
        .reduce((t, i) => ({ ...t, ...i }), {}),
      colors: {
        primary: {
          low: createPalette(theme.colors.primary.low, 13),
          main: createPalette(theme.colors.primary.main, 13),
          high: createPalette(theme.colors.primary.high, 13)
        },
        secondary: {
          low: createPalette(theme.colors.secondary.low, 13),
          main: createPalette(theme.colors.secondary.main, 13),
          high: createPalette(theme.colors.secondary.high, 13)
        },
        neutral: createPalette(theme.colors.neutral, 13),
        error: createPalette(theme.colors.error, 13)
      },
      dropShadow: {
        'size-1': `0 0 0.0625rem var(--tw-shadow-color)`,
        'size-2': `0 0 0.125rem var(--tw-shadow-color)`,
        'size-3': `0 0 0.25rem var(--tw-shadow-color)`,
        'size-4': `0 0 0.5rem var(--tw-shadow-color)`,
        'size-5': `0 0 1rem var(--tw-shadow-color)`,
        'size-6': `0 0 1.5rem var(--tw-shadow-color)`
      }
    }
  },
  plugins: []
}
