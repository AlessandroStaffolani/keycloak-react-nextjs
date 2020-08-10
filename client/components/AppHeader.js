import React, {useEffect, useState} from "react";
import useAuth from "../lib/auth";
import Link from "next/link";
import { Menu, Header, Dropdown } from "semantic-ui-react";

function AppHeader({ setIsLoginModalOpen, activePage }) {
  const [showUser, setShowUser] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const { isAuthenticated, logout, user, hasRole } = useAuth();

  useEffect(() => {
    const checkRoles = async () => {
      setShowUser(await hasRole('user'))
      setShowAdmin(await hasRole('admin'))
    }
    checkRoles()
  }, [isAuthenticated])

  return (
    <nav className="header">
      <Menu stackable className="navbar">
        <Menu.Item
          style={{ cursor: "pointer " }}
          name="home"
          link
          fitted="vertically"
        >
          <Link href="/">
            <a>
              <img className="logo" alt="Logo" src="/keycloak.png" />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Menu className="navigation">
          <Menu.Item
            style={{ cursor: "pointer " }}
            name="home"
            active={activePage === ""}
          >
            <Link href="/">
              <h4>Home</h4>
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{ cursor: "pointer " }}
            name="public"
            active={activePage === "public"}
          >
            <Link href="/public">
              <h4>Public</h4>
            </Link>
          </Menu.Item>
          {isAuthenticated && showUser ? (
            <Menu.Item
              style={{ cursor: "pointer " }}
              name="user"
              active={activePage === "user"}
            >
              <Link href="/user">
                <h4>User</h4>
              </Link>
            </Menu.Item>
          ) : null}
          {isAuthenticated && showAdmin ? (
            <Menu.Item
              style={{ cursor: "pointer " }}
              name="admin"
              active={activePage === "admin"}
            >
              <Link href="/admin">
                <h4>Admin</h4>
              </Link>
            </Menu.Item>
          ) : null}
        </Menu.Menu>
        <Menu.Menu position="right">
          {isAuthenticated && user ? (
            <Dropdown item direction="left" as="h4" text={user.preferred_username}>
              <Dropdown.Menu>
                <Dropdown.Item disabled icon="mail" text={user.email} />
                <Dropdown.Item disabled icon="user" text={`${user.given_name} ${user.family_name}`} />
                <Dropdown.Item icon="log out" text="Logout" onClick={() => logout()} />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item
              style={{ cursor: "pointer " }}
              onClick={() => setIsLoginModalOpen(true)}
            >
              <Header as="h4">Login</Header>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </nav>
  );
}

export default AppHeader;
