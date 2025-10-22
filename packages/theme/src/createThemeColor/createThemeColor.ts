import type {
  ThemeSettingsColorNames,
  ThemeSettingsColorSeries,
  ThemeSettingsColorFunction,
  ThemeSettingsColor,
  ThemeColorOptions,
  ThemeColor
} from '../types.js'

const minMax = (min: number, max: number) => (value: number) => Math.min(max, Math.max(min, value))
const minMax0to100 = minMax(0, 100)
const minMax0to230 = minMax(0, 230)
const minMax0to360 = minMax(0, 360)
const minMax0to1 = minMax(0, 1)
const searchRegExp = (string: string, regexp: RegExp): string | null => {
  const result = string.match(regexp)
  if (Array.isArray(result)) {
    return String(result[0])
  }
  return null
}

const colorOptionsDefault = {}

const fromArrayToHSL = (
  src: [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  const [hue, saturation, lightness, alpha = 1] = src
  const { alpha: alphaOverwrite = 1 } = options

  const h = minMax0to360(hue)
  const s = minMax0to100(saturation)
  const l = minMax0to100(lightness)
  const a = minMax0to1(alpha) * minMax0to1(alphaOverwrite)
  return `hsl(${h},${s}%,${l}%,${a})`
}

const fromArrayToRGB = (
  src: [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  const [red, green, blue, alpha = 1] = src
  const { alpha: alphaOverwrite = 1 } = options

  const r = minMax0to100(red)
  const g = minMax0to100(green)
  const b = minMax0to100(blue)
  const a = minMax0to1(alpha) * minMax0to1(alphaOverwrite)
  return `rgb(${r}%,${g}%,${b}%,${a})`
}

const fromArrayToLCH = (
  src: [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  const [light, chroma, hue, alpha = 1] = src
  const { alpha: alphaOverwrite = 1 } = options

  const l = minMax0to100(light)
  const c = minMax0to230(chroma)
  const h = minMax0to360(hue)
  const a = minMax0to1(alpha) * minMax0to1(alphaOverwrite)
  return `lch(${l} ${c} ${h} / ${a})`
}

const fromArrayToHWB = (
  src: [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  const [hue, whiteness, blackness, alpha = 1] = src
  const { alpha: alphaOverwrite = 1 } = options

  const h = minMax0to360(hue)
  const w = minMax0to100(whiteness)
  const b = minMax0to100(blackness)
  const a = minMax0to1(alpha) * minMax0to1(alphaOverwrite)
  return `hwb(${h} ${w}% ${b}% / ${a})`
}

const formatColor = (color: string, options: ThemeColorOptions = colorOptionsDefault): string => {
  const { alpha } = options

  if (alpha === undefined || alpha === null) {
    return color
  }

  if (!/^(hsla?|rgba?|lch|hwb)\([a-zA-Z0-9,./% -]+\)$/.test(color)) {
    return color
  }

  const separators = Array.from(color.matchAll(/(,\s?|\s?\/\s?|\s)/g))
  const hasCurrentAlpha = separators.length === 3

  const isCommaSeparated = color.includes(',')
  const alphaAdjust = minMax0to1(alpha)

  if (hasCurrentAlpha) {
    const alphaCurrentMatch = searchRegExp(color, /\d+(\.\d+)?%?\)$/)!
    const isPercentage = alphaCurrentMatch.includes('%')

    let alphaCurrent = Number(alphaCurrentMatch.replace(/%?\)$/g, ''))
    alphaCurrent = isPercentage ? minMax0to100(alphaCurrent) : minMax0to1(alphaCurrent)

    return color.replace(
      /\d+(\.\d+)?%?\)$/,
      `${alphaCurrent * alphaAdjust}${isPercentage ? '%' : ''})`
    )
  }

  return color.replace(/\)$/, isCommaSeparated ? `,${alphaAdjust})` : ` / ${alphaAdjust})`)
}

const createThemeColorBySeries =
  (name: ThemeSettingsColorNames, series: ThemeSettingsColorSeries) =>
  (indexProvided: number, options?: ThemeColorOptions): string => {
    if (!series.length) {
      return ''
    }

    const index = Math.round(indexProvided)
    const color = series[index > series.length - 1 ? series.length - 1 : index]

    if (typeof color === 'string') {
      return formatColor(color, options)
    }

    if (name === 'rgb') {
      return fromArrayToRGB(color, options)
    }
    if (name === 'lch') {
      return fromArrayToLCH(color, options)
    }
    if (name === 'hwb') {
      return fromArrayToHWB(color, options)
    }

    return fromArrayToHSL(color, options)
  }

const createThemeColorByFunction =
  (name: ThemeSettingsColorNames, create: ThemeSettingsColorFunction) =>
  (indexProvided: number, options?: ThemeColorOptions): string => {
    const index = Math.round(indexProvided)
    const color = create(index)

    if (typeof color === 'string') {
      return formatColor(color, options)
    }

    if (name === 'rgb') {
      return fromArrayToRGB(color, options)
    }
    if (name === 'lch') {
      return fromArrayToLCH(color, options)
    }
    if (name === 'hwb') {
      return fromArrayToHWB(color, options)
    }

    return fromArrayToHSL(color, options)
  }

const createThemeColor = (settings: ThemeSettingsColor): ThemeColor => {
  if (Array.isArray(settings)) {
    return createThemeColorBySeries('hsl', settings)
  }

  if (typeof settings === 'function') {
    return createThemeColorByFunction('hsl', settings)
  }

  if (Array.isArray(settings.list)) {
    return createThemeColorBySeries(settings.color, settings.list)
  }

  const createColor = settings.create

  if (typeof createColor !== 'function') {
    throw new Error('ARWES createThemeColor requires a valid list of colors or a color creator.')
  }

  return createThemeColorByFunction(settings.color, createColor)
}

export { createThemeColor }
