const setTextNodesContent = (
  textNodes: Node[],
  texts: string[],
  contentLength: number,
  onCurrentNode?: (textNode: Node) => void
): void => {
  let markerLength = 0

  for (let index = 0; index < textNodes.length; index++) {
    const textNode = textNodes[index]
    const text = texts[index]
    const newMarkerLength = markerLength + text.length

    if (newMarkerLength <= contentLength) {
      if (textNode.textContent !== text) {
        textNode.textContent = text
      }

      if (newMarkerLength === contentLength) {
        onCurrentNode?.(textNode)
      }
    }
    //
    else if (markerLength < contentLength) {
      const currentTextNodeLengthPortion = contentLength - markerLength
      const currentTextNodeText = text.substring(0, currentTextNodeLengthPortion)

      if (textNode.textContent !== currentTextNodeText) {
        textNode.textContent = currentTextNodeText
      }

      onCurrentNode?.(textNode)
    }
    //
    else {
      if (textNode.textContent !== '') {
        textNode.textContent = ''
      }

      if (contentLength === 0 && index === 0) {
        onCurrentNode?.(textNode)
      }
    }

    markerLength = newMarkerLength
  }
}

export { setTextNodesContent }
