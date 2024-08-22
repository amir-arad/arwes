import React, { type ReactElement, Fragment, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import {
  type ThemeSettingsUnit,
  type ThemeSettingsMultiplier,
  type ThemeSettingsColor,
  type ThemeSettingsStyle,
  type ThemeUnit,
  type ThemeMultiplier,
  type ThemeColor,
  type ThemeStyle,
  type ThemeCreatorStructure,
  createCreateTheme
} from '@arwes/theme'

interface ThemeSettings {
  space: ThemeSettingsUnit
  outline: ThemeSettingsMultiplier
  font: ThemeSettingsStyle
  color: {
    primary: ThemeSettingsColor
    secondary: ThemeSettingsColor
  }
}

interface Theme {
  space: ThemeUnit
  outline: ThemeMultiplier
  font: ThemeStyle
  color: {
    primary: ThemeColor
    secondary: ThemeColor
  }
}

const themeStructure: ThemeCreatorStructure = {
  space: 'multiplier',
  outline: 'multiplier',
  font: 'style',
  color: {
    primary: 'color',
    secondary: 'color'
  }
}

const themeDefaults: ThemeSettings = {
  // Values to be multiplied by a provided integer.
  space: (i) => `${i}rem`,
  outline: 1,
  // A list of styles with any CSS properties.
  font: [
    { fontFamily: 'monospace', fontSize: '30px' },
    { fontFamily: 'sans-serif', fontSize: '21px' }
  ],
  color: {
    // A function to return a HSLA value as [number, number, number, number?].
    // The colors go from light to dark.
    primary: (i) => [180, 70, 95 - i * 5, 1],
    secondary: (i) => [60, 70, 95 - i * 5, 1]
  }
}

const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults)

const Sandbox = (): ReactElement => {
  const theme: Theme = useMemo(() => {
    const themeExtensions = {
      outline: 3
    }
    const theme = createTheme(themeExtensions)
    return theme
  }, [])

  return (
    <Fragment>
      <Global
        styles={{
          html: {
            margin: theme.space(2),
            backgroundColor: theme.color.primary(18)
          },
          h1: {
            ...theme.font(0),
            marginBottom: theme.space(1),
            borderBottomWidth: theme.outline(1),
            borderBottomStyle: 'solid',
            borderBottomColor: theme.color.primary(14),
            paddingBottom: theme.space(1),
            color: theme.color.primary(5)
          },
          p: {
            ...theme.font(1),
            color: theme.color.secondary(8)
          }
        }}
      />
      <h1>Arwes Framework</h1>
      <p>Futuristic Sci-Fi UI Web Framework</p>
    </Fragment>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
