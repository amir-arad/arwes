const filterProps = <Props extends Record<string, unknown>>(props: Props): Props => {
  const propsNew: Record<string, unknown> = {}
  const keys = Object.keys(props)

  for (const key of keys) {
    if (props[key] !== undefined) {
      propsNew[key] = props[key]
    }
  }

  return propsNew as Props
}

export { filterProps }
