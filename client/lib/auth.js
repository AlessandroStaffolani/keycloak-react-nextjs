import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import api, {addBearerToken, removeBearerToken} from "./api";

const AuthContext = createContext({});

export const AuthProvider = ({ children, setGlobalMessage }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        addBearerToken(token)
        try {
          const {data: user} = await api.get("system/users/me");
          if (user) {
            setUser(user);
          }
        } catch (err) {
          Cookies.remove("token")
          removeBearerToken()
          console.log("Current token is not valid")
        }
      }
      setLoading(false)
    }
    loadUserFromCookies();
  }, []);

  const login = async (username, password) => {
    try {
      const {data: access_token} = await api.post("auth/login", {
        username,
        password,
      });
      if (access_token) {
        const token = access_token.token
        console.log("Got token");
        Cookies.set("token", token, {expires: 6});
        addBearerToken(token)
        const {data: user} = await api.get("system/users/me");
        setUser(user);
        setGlobalMessage({
          positive: true,
          header: 'Your are successfully logged in!',
          content: `You are now logged in as user: ${user.preferred_username}.`
        })
        console.log("Got user");
        return {
          result: true
        }
      }
    } catch (err) {
      return {
        result: false,
        error: err
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    removeBearerToken()
    setUser(null);
    setGlobalMessage({
      info: true,
      header: 'Your are successfully logged out!',
      content: `You are no more logged in.`
    })
    router.push("/");
  };

  const hasRole = async (role) => {
    try {
      const { data: response } = await api.get(`system/users/has/realmrole/${role}`)
      return response.hasRole
    } catch (err) {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = (Component, role) => {
  return (props) => {
    const { isAuthenticated, loading, hasRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      hasRole(role)
        .then(userHasRole => {
          if ((!isAuthenticated || !userHasRole) && !loading) {
            props.setGlobalMessage({
              negative: true,
              header: 'Requested page is protected!',
              content: `In order to access to this page you need to be authenticated as ${role}.`
            })
            router.push('/')
          }
        })
        .catch(err => {

        })

    }, [loading, isAuthenticated])
    return (<Component {...arguments} {...props} />)
  }
}

export default function useAuth() {
  return useContext(AuthContext);
}
