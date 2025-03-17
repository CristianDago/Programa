// src/main.tsx
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/appRoutes";
import { AuthProvider } from "./components/auth/authContext";
import "./assets/styles/global.scss";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </StrictMode>
);