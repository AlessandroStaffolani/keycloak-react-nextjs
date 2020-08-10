import React from 'react';
import {Divider, Header, Segment} from "semantic-ui-react";
import PageAction from "./PageAction";

export default function PageContent({ actions }) {
  return (
    <Segment>
      {actions.map((action, index) => (
        <div key={index}>
          <Header as="h3">{action.title}</Header>
          <p>{action.content}</p>
          <PageAction resource={action.resource} action={action.action} />
          {index < actions.length - 1 ? <Divider section /> : null}
        </div>
      ))}
    </Segment>
  )
}
