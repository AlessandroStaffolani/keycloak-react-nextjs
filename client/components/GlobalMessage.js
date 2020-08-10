import React, {useEffect} from 'react'
import {Message} from "semantic-ui-react";

export default function GlobalMessage({message, setMessage}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000)
    return () => clearTimeout(timer)
  })
  if (message) {
    return (
      <Message
        onDismiss={() => setMessage(null)}
        info={message.info ? true : false}
        positive={message.positive ? true : false}
        negative={message.negative ? true : false}
        warning={message.warning ? true : false}
        header={message.header}
        content={message.content}
      />
    )
  } else {
    return null
  }
}
