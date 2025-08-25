// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getMe, postLogin, postLogout, postRegister } from "../services/authService";
import { setToken, removeToken, getToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = async () => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    try {
      const res = await getMe();
      setUser(res.data.user);
    } catch {
      removeToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bootstrap(); }, []);

  const login = async (payload) => {
    const res = await postLogin(payload);
    setToken(res.data.token);
    setUser(res.data.data.user);
    return res.data.data.user;
  };

  const register = async (payload) => {
    const res = await postRegister(payload);
    setToken(res.data.token);
    setUser(res.data.data.user);
    return res.data.data.user;
  };

  const logout = async () => {
    try { await postLogout(); } catch {}
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
