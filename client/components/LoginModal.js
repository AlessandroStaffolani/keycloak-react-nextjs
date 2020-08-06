import React, { useState } from "react";
import { Modal, Button, Divider, Form, Icon } from "semantic-ui-react";

export default function LoginModal({ isOpen, setIsOpen }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [passwordFieldIcon, setPasswordFieldIcon] = useState("eye");

  const handlePasswordFieldTypeChange = () => {
    const type = passwordFieldType === "password" ? "text" : "password";
    const icon = passwordFieldIcon === "eye" ? "eye slash" : "eye";
    setPasswordFieldType(type);
    setPasswordFieldIcon(icon);
  };
  return (
    <Modal
      size={"tiny"}
      dimmed={"blurring"}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              icon={
                <Icon
                  name={passwordFieldIcon}
                  link
                  onClick={handlePasswordFieldTypeChange}
                />
              }
              iconPosition="right"
              placeholder="Password"
              type={passwordFieldType}
              value={password}
              label="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
          <Divider />
          <p>
            Insert you credential or{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              registrer
            </a>
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted color="red" onClick={() => setIsOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={() => setIsOpen(false)}>
          <Icon name="checkmark" /> Login
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
