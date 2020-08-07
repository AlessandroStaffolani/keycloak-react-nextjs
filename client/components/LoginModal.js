import React, { useState } from "react";
import { Modal, Button, Divider, Form, Icon } from "semantic-ui-react";
import {get_access_token} from "../lib/authorize";

export default function LoginModal({ isOpen, setIsOpen }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [passwordFieldIcon, setPasswordFieldIcon] = useState("eye");
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const handlePasswordFieldTypeChange = () => {
    const type = passwordFieldType === "password" ? "text" : "password";
    const icon = passwordFieldIcon === "eye" ? "eye slash" : "eye";
    setPasswordFieldType(type);
    setPasswordFieldIcon(icon);
  };

  const handleLoginClick = () => {
    let isValid = true
    if (username === '') {
      isValid = false
      setUsernameError({content: 'Please provide a username', pointing: 'below'})
    }
    if (password === '') {
      isValid = false
      setPasswordError({content: 'Please provide a password', pointing: 'below'})
    }
    if (isValid) {
      // call the login method
      setIsOpen(false)
      handleOnClose()
      const token = get_access_token(username, password)
      if (token !== null) {
        // logged
      } else {
        // error message
      }
    }
  }

  const handleOnChange = (e, field) => {
    const value = e.target.value
    if (field === 'username') {
      setUsername(value)
      setUsernameError(null)
    } else if (field === 'password') {
      setPassword(value)
      setPasswordError(null)
    }
  }

  const handleOnClose = () => {
    setUsername('')
    setPassword('')
    setPasswordFieldIcon('eye')
    setPasswordFieldType('password')
    setUsernameError(null)
    setPasswordError(null)
    setIsOpen(false)
  }

  return (
    <Modal
      size={"tiny"}
      dimmed={"blurring"}
      onClose={handleOnClose}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              error={usernameError}
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => handleOnChange(e, 'username')}
            />
            <Form.Input
              icon={
                <Icon
                  name={passwordFieldIcon}
                  link
                  onClick={handlePasswordFieldTypeChange}
                />
              }
              error={passwordError}
              placeholder="Password"
              type={passwordFieldType}
              value={password}
              label="password"
              onChange={(e) => handleOnChange(e, 'password')}
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
        <Button inverted color="red" onClick={handleOnClose}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleLoginClick}>
          <Icon name="checkmark" /> Login
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
