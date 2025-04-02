// src/components/auth/authContext.tsx
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import AuthProviderProps from "../../interface/auth/authProviderProps";
import AuthContextType from "../../interface/auth/authContextType";
import { useAuthStorage } from "./authStorage";
import * as Sentry from "@sentry/react";

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
  const { token, updateToken, clearToken } = useAuthStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => !!token, [token]);

  console.log("AuthContext renderizado", {
    token,
    userId,
    email,
    isAuthenticated,
    isLoading,
  });

  useEffect(() => {
    if (!token) {
      setUserId(null);
      setEmail(null);
      return;
    }

    setIsLoading(true);
    try {
      const decoded = jwtDecode<{ uid: string; email: string }>(token);

      // Solo actualizamos si el token cambió y se decodifica correctamente
      if (decoded.uid !== userId || decoded.email !== email) {
        setUserId(decoded.uid);
        setEmail(decoded.email);
      }
    } catch (error) {
      Sentry.captureException(error);
      clearToken();
    } finally {
      setIsLoading(false);
    }
  }, [token, userId, email, clearToken]);

  const login = useCallback(
    async (newToken: string) => {
      setIsLoading(true);
      try {
        const decoded = jwtDecode<{ uid: string; email: string }>(newToken);

        // Solo actualizamos si el token cambió
        if (newToken !== token) updateToken(newToken);

        // Solo actualizamos si el userId o el email cambian
        if (decoded.uid !== userId) setUserId(decoded.uid);
        if (decoded.email !== email) setEmail(decoded.email);
      } catch (error) {
        Sentry.captureException(error);
        clearToken();
      } finally {
        setIsLoading(false);
      }
    },
    [updateToken, clearToken, token, userId, email]
  );

  const logout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  const value = useMemo(
    () => ({
      token,
      userId,
      email,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [token, userId, email, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
