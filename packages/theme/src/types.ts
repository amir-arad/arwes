/* eslint-disable @typescript-eslint/ban-types */

import type { Properties as CSSProperties } from 'csstype'
import type { PartialDeep } from '@arwes/tools'

// Theme Settings

export type ThemeSettingsMultiplierFunction = (index: number) => number
export type ThemeSettingsMultiplier = number | number[] | ThemeSettingsMultiplierFunction

export type ThemeSettingsUnitFunction = (index: number) => string
export type ThemeSettingsUnit = string[] | ThemeSettingsUnitFunction

export type ThemeSettingsColorNames = 'hsl' | 'rgb' | 'lch' | 'hwb'
export type ThemeSettingsColorSeries = Array<string | [number, number, number, number?]>
export type ThemeSettingsColorFunction = (
  index: number
) => [number, number, number, number?] | string
export type ThemeSettingsColor =
  | ThemeSettingsColorSeries
  | ThemeSettingsColorFunction
  | {
      color: ThemeSettingsColorNames
      list?: ThemeSettingsColorSeries
      create?: ThemeSettingsColorFunction
    }

export type ThemeSettingsStyle = ThemeStyleValue[]

export interface ThemeSettingsBreakpointsKeyListItem<Keys extends string = string> {
  key: Keys
  value: string
}

export type ThemeSettingsBreakpoints<Keys extends string = string> = Array<
  ThemeSettingsBreakpointsKeyListItem<Keys>
>

// Theme Consumer

export type ThemeMultiplier = (index: number) => number

export type ThemeUnit = (index: number | string | Array<number | string>) => string

export interface ThemeColorOptions {
  alpha?: number
}
export type ThemeColor = (index: number, options?: ThemeColorOptions) => string

export type ThemeStyleValue = CSSProperties
export type ThemeStyle = (index: number) => ThemeStyleValue

export interface ThemeBreakpoints<Keys extends string = string> {
  breakpoints: Keys[]
  settings: ThemeSettingsBreakpoints<Keys>
  up: (key: Keys | (string & {}), opts?: { strip?: boolean }) => string
  down: (key: Keys | (string & {}), opts?: { strip?: boolean }) => string
  between: (
    startKey: Keys | (string & {}),
    endKey: Keys | (string & {}),
    opts?: { strip?: boolean }
  ) => string
}

// Theme Creators

export interface ThemeCreatorStructure {
  [key: string]:
    | 'multiplier'
    | 'unit'
    | 'color'
    | 'style'
    | 'breakpoints'
    | 'other'
    | ThemeCreatorStructure
}

export type ThemeCreator<ThemeSettings, Theme> = (
  themeSettingsExtensions?:
    | PartialDeep<ThemeSettings>
    | Array<PartialDeep<ThemeSettings> | undefined>
    | undefined
) => Theme
