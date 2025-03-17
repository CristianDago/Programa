import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as Sentry from "@sentry/react"; // Importa Sentry para el registro de errores

export const useAuthStorage = () => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return Cookies.get("token") ?? null;
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error al obtener el token de las cookies:", error);
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      try {
        Cookies.set("token", token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production", // Solo Secure en producción
          httpOnly: true,
          sameSite: "strict",
        });
      } catch (error) {
        Sentry.captureException(error);
        console.error("Error al establecer el token en las cookies:", error);
      }
    } else {
      try {
        Cookies.remove("token", {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      } catch (error) {
        Sentry.captureException(error);
        console.error("Error al eliminar el token de las cookies:", error);
      }
    }
  }, [token]);

  const clearToken = () => {
    setToken(null);
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  return { token, setToken, clearToken, updateToken };
};
