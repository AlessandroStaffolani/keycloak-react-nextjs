import React from 'react'
import { Placeholder } from "semantic-ui-react";

export default function LoadingPlaceholder({lines, blocks}) {
  const placeholderLines = []
  for (let i = 0; i < lines; i++) {
    placeholderLines.push(<Placeholder.Line key={i} />)
  }
  const placeholderBlocks = []
  for (let i = 0; i < blocks; i++) {
    placeholderBlocks.push(<Placeholder key={i}>{placeholderLines}</Placeholder>)
  }
  return (
    <div>
      {placeholderBlocks.map(Block => Block)}
    </div>
  )
}
