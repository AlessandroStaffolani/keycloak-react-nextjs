import React, { useState } from "react";
import AppHeader from "./AppHeader";
import Head from "next/head";
import { Container } from "semantic-ui-react";
import AppFooter from "./AppFooter";
import LoginModal from "./LoginModal";

function Layout({ children, title }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  let titleString = `- ${title}`;
  if (title === "" || title === null || title === undefined) {
    titleString = "";
  }
  return (
    <div>
      <Head>
        <title>Keycloak POC {titleString}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page">
        <AppHeader setIsLoginModalOpen={setIsLoginModalOpen} />
        <Container text className="content">
          {children}
        </Container>
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        <AppFooter />
      </div>
    </div>
  );
}

export default Layout;
