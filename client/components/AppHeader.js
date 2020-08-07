import React  from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { Header } from "semantic-ui-react";

function AppHeader({ setIsLoginModalOpen, activePage }) {

  return (
    <nav className="header">
      <Menu stackable className="navbar">
        <Menu.Item name="home" link fitted="vertically">
          <Link href="/">
            <a>
              <img className="logo" alt="Logo" src="/keycloak.png" />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Menu className="navigation">
          <Menu.Item name="home" active={activePage === ""}>
            <Link href="/">
              <h4>Home</h4>
            </Link>
          </Menu.Item>
          <Menu.Item name="public" active={activePage === "public"}>
            <Link href="/public">
              <h4>Public</h4>
            </Link>
          </Menu.Item>
          <Menu.Item name="user" active={activePage === "user"}>
            <Link href="/user">
              <h4>User</h4>
            </Link>
          </Menu.Item>
          <Menu.Item name="admin" active={activePage === "admin"}>
            <Link href="/admin">
              <h4>Admin</h4>
            </Link>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => setIsLoginModalOpen(true)}>
            <Header as="h4">Login</Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </nav>
  );
}

export default AppHeader;
