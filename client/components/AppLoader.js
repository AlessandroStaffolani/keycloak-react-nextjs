import React from 'react'
import { Loader, Dimmer } from "semantic-ui-react";


export default function AppLoader({loading}) {

  return (
    <Dimmer active={loading} page>
      <Loader size="medium">Loading</Loader>
    </Dimmer>
  )
}
