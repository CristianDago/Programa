// src/components/auth/authStorage.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

export const useAuthStorage = () => {
  const [token, setToken] = useState<string | null>(() => {
    const cookieToken = Cookies.get("token");
    return cookieToken || null;
  });

  // Memoiza las funciones
  const clearToken = useCallback(() => setToken(null), []);
  const updateToken = useCallback((newToken: string) => setToken(newToken), []);

  // Efecto optimizado
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  return useMemo(
    () => ({
      token,
      clearToken,
      updateToken,
    }),
    [token, clearToken, updateToken]
  );
};
