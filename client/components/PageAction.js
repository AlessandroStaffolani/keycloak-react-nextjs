import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";

export default function PageAction({ title, color, message }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button color={color} onClick={() => setShow(!show)}>
        {title}
      </Button>
      {show ? <Message color={color} header={title} content={message} /> : null}
    </div>
  );
}
