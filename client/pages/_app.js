import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../lib/auth";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import LoginModal from "../components/LoginModal";
import { Container } from "semantic-ui-react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

function MyApp ({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const router = useRouter();

  useEffect(() => {
    let currentPath = router.route;
    currentPath = currentPath.split("/")[1];
    console.log(currentPath);
    setActivePage(currentPath);
  });

  pageProps.setPageTitle = setPageTitle;
  return (
    <AuthProvider>
      <Head>
        <title>Keycloak POC {pageTitle !== "" ? `- ${pageTitle}` : ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page">
        <AppHeader
          setIsLoginModalOpen={setIsLoginModalOpen}
          activePage={activePage}
        />
        <Container text className="content">
          <Component {...pageProps} />
        </Container>
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        <AppFooter />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
