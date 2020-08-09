import React, { useState, useEffect } from "react";
import { Button, Message } from "semantic-ui-react";
import api from "../lib/api";

export default function PageAction({ resource, action }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState("");

  const handleClick = async () => {
    try {
      const response = await api.get(`/api/${resource}/${action}`);
      if (response.status === 200) {
        setTitle(response.data.title);
        setMessage(response.data.message);
        setVisibility(response.data.visibility);
        setSuccess(true);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setMessage(error.toString());
      setTitle("Error");
      setShow(true)
    }
  };

  return (
    <div>
      <div className="text-right">
        <Button color={action === 'primary' ? 'blue' : 'black'} onClick={handleClick}>
          Execute {action} action
        </Button>
      </div>
      <div className="text-center">
        {show ? (
          <Message
            onDismiss={() => setShow(false)}
            style={{ marginTop: "20px" }}
            success={success}
            negative={!success}
            header={title}
          >
            <p>
              {message}
              <br />
              {visibility ? (`Visibility: ${visibility}`) : null}
            </p>
          </Message>
        ) : null}
      </div>
    </div>
  );
}
