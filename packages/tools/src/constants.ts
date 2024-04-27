// TODO: In some environments these variables are not executed at runtime but at build time.

export const IS_BROWSER: boolean = typeof window !== 'undefined'

export const IS_BROWSER_SAFARI: boolean =
  IS_BROWSER &&
  window.navigator.userAgent.includes('Safari') &&
  !window.navigator.userAgent.includes('Chrome')
