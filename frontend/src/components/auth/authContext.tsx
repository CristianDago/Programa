import React, { useContext, createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthProviderProps from "../../interface/auth/authProviderProps";
import AuthContextType from "../../interface/auth/authContextType";
import { useAuthStorage } from "./authStorage"; // Asegúrate de que este hook sea seguro para producción
import * as Sentry from "@sentry/react"; // Importa Sentry para el registro de errores
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  email: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, setToken } = useAuthStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ [key: string]: any }>(token);
        setUserId(decoded.uid);
        setEmail(decoded.email);
      } catch (error) {
        Sentry.captureException(error); // Registra el error en Sentry
        console.error("Error al decodificar el token:", error);
        setUserId(null);
        setEmail(null);
      }
    } else {
      setUserId(null);
      setEmail(null);
    }
  }, [token]);

  const login = async (newToken: string) => {
    setIsLoading(true);
    try {
      Cookies.set("token", newToken);
      setToken(newToken);
      const decoded = jwtDecode<{ [key: string]: any }>(newToken);
      setUserId(decoded.uid);
      setEmail(decoded.email);
      console.log("✅ Usuario autenticado con ID:", decoded.uid);
      console.log("✅ Email del usuario:", decoded.email);
    } catch (error) {
      Sentry.captureException(error); // Registra el error en Sentry
      console.error("❌ Error en el login:", error);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setUserId(null);
    setEmail(null);
  };

  const value = {
    token,
    userId,
    email,
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
