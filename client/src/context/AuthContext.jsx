import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rewear_user")) } catch { return null }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("rewear_token");
    if (!token) { setLoading(false); return; }
    api.get("/auth/me").then(({ data }) => {
      setUser(data.user); localStorage.setItem("rewear_user", JSON.stringify(data.user));
    }).catch(() => { localStorage.removeItem("rewear_token"); localStorage.removeItem("rewear_user"); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (data) => {
    localStorage.setItem("rewear_token", data.token);
    localStorage.setItem("rewear_user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("rewear_token"); localStorage.removeItem("rewear_user"); setUser(null);
  };
  return <AuthContext.Provider value={{ user, loading, saveSession, logout }}>{children}</AuthContext.Provider>;
}
