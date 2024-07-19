import type * as CSS from 'csstype'

export type FrameSVGSettingsStyle = CSS.Properties

export type FrameSVGSettingsPathDimension = number | string

type FrameSVGSettingsPathCommandName =
  | 'M'
  | 'm'
  | 'L'
  | 'l'
  | 'H'
  | 'h'
  | 'V'
  | 'v'
  | 'C'
  | 'c'
  | 'S'
  | 's'
  | 'Q'
  | 'q'
  | 'T'
  | 't'
  | 'A'
  | 'a'

export type FrameSVGSettingsPathCommand =
  | 'Z'
  | 'z'
  | [FrameSVGSettingsPathCommandName, ...FrameSVGSettingsPathDimension[]]

export type FrameSVGSettingsPathDefinition = FrameSVGSettingsPathCommand[]

type FrameSVGSettingsElementCommon = {
  name?: string
  id?: string
  className?: string
  style?: FrameSVGSettingsStyle
}

export type FrameSVGSettingsElement = FrameSVGSettingsElementCommon & {
  type?: 'path'
  path: FrameSVGSettingsPathDefinition
}

export interface FrameSVGSettings {
  elements: FrameSVGSettingsElement[]
}
