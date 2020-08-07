import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import api from "./api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await api.get("system/users/me");
        if (user) {
          setUser(user);
        }
      }
      setLoading(false)
    }
    loadUserFromCookies();
  }, []);

  const login = async (username, password) => {
    const { data: token } = await api.post("auth/login", {
      username,
      password,
    });
    if (token) {
      console.log("Got token");
      Cookies.set("token", token, { expires: 6 });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await api.get("system/users/me");
      setUser(user);
      console.log("Got user", user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function ProtectedRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        setAuthMessage('The requested page requires to be authenticated')
        router.push('/')
      }
    }, [loading, isAuthenticated])

    return (<Component {...arguments} />)
  }
}

export default function useAuth() {
  return useContext(AuthContext);
}
