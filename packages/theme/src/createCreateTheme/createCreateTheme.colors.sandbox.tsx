import React, { type ReactElement, Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import {
  type ThemeSettingsColor,
  type ThemeColor,
  type ThemeCreatorStructure,
  createCreateTheme
} from '@arwes/theme'

interface ThemeSettingsPalette {
  low: ThemeSettingsColor
  main: ThemeSettingsColor
  high: ThemeSettingsColor
}

interface ThemeSettings {
  colors: {
    primary: ThemeSettingsPalette
    secondary: ThemeSettingsPalette
  }
}

interface ThemePalette {
  low: ThemeColor
  main: ThemeColor
  high: ThemeColor
}

interface Theme {
  colors: {
    primary: ThemePalette
    secondary: ThemePalette
  }
}

const themeStructurePalette: ThemeCreatorStructure = {
  low: 'color',
  main: 'color',
  high: 'color'
}

const themeStructure: ThemeCreatorStructure = {
  colors: {
    primary: themeStructurePalette,
    secondary: themeStructurePalette
  }
}

const createThemePalette = (hue: number): ThemeSettingsPalette => ({
  low: (i: number) => [hue, 10 + i, 92.5 - i * 9.44],
  main: (i: number) => [hue, 50 + i, 92.5 - i * 9.44],
  high: (i: number) => [hue, 90 + i, 92.5 - i * 9.44]
})

const themeDefaults: ThemeSettings = {
  colors: {
    primary: createThemePalette(100),
    secondary: createThemePalette(200)
  }
}

const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults)

const theme = createTheme()

const Sandbox = (): ReactElement => {
  return (
    <Fragment>
      <Global
        styles={{
          html: {
            margin: '0.5rem',
            lineHeight: 1.5,
            color: '#ddd',
            backgroundColor: '#111'
          },
          'h1, h2, h3': {
            margin: 0
          }
        }}
      />

      <h1>
        <code>colors</code>
      </h1>

      {(Object.keys(theme.colors) as unknown as Array<keyof Theme['colors']>).map((colorName) => (
        <div key={colorName}>
          <h2>
            <code>{colorName}</code>
          </h2>

          {(
            Object.keys(theme.colors[colorName]) as unknown as Array<
              keyof Theme['colors'][typeof colorName]
            >
          ).map((variant) => (
            <div key={variant}>
              <h3>
                <code>{variant}</code>
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: 40,
                        backgroundColor: theme.colors[colorName][variant](index),
                        color: index < 5 ? '#111' : '#ddd',
                        fontSize: '1rem'
                      }}
                      title={`theme.colors.${String(colorName)}.${String(
                        variant
                      )}(${index}) = ${theme.colors[colorName][variant](index)}`}
                    >
                      <code>{index}</code>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
