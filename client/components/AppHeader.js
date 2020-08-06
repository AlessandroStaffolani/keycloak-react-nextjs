import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { Header } from "semantic-ui-react";
import { useRouter } from "next/router";

function AppHeader({ setIsLoginModalOpen }) {
  const [activePage, setActivePage] = useState("home");
  const router = useRouter();

  useEffect(() => {
    let currentPath = router.route;
    currentPath = currentPath.split("/")[1];
    setActivePage(currentPath);
  }, []);

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
              <Header as="h4">Home</Header>
            </Link>
          </Menu.Item>
          <Menu.Item name="public" active={activePage === "public"}>
            <Link href="/public">
              <Header as="h4">Public</Header>
            </Link>
          </Menu.Item>
          <Menu.Item name="user" active={activePage === "user"}>
            <Link href="/user">
              <Header as="h4">User</Header>
            </Link>
          </Menu.Item>
          <Menu.Item name="admin" active={activePage === "admin"}>
            <Link href="/admin">
              <Header as="h4">Admin</Header>
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
