// src/routes/appRoutes.tsx
import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes";
import ProtectedLayout from "../components/layouts/protected-layout/protectedLayout";

// 1. Definición segura de lazy imports
const lazyImport = (path: string) =>
  lazy(() =>
    import(`../pages/${path}`)
      .then((module) => ({ default: module.default }))
      .catch(() => ({ default: () => <div>Error loading component</div> }))
  );

// 2. Carga de componentes
const LoginPage = lazyImport("login/loginPage");
const Signup = lazyImport("signup/signup");
const Dashboard = lazyImport("dashboard/dashboard");
const StudentProfile = lazyImport("student-profile/studentProfile");
const AddStudent = lazyImport("add-student/addStudent");
const SchoolClass = lazyImport("school-class/schoolClass");
const Statistics = lazyImport("statistics/statistics");
const Chat = lazyImport("chat/chat");

// 3. Definición de rutas con tipo explícito
const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />, // Capa de protección
    children: [
      {
        element: <ProtectedLayout />, // Layout con Sidebar
        children: [
          {
            path: "/dashboard",
            children: [
              { index: true, element: <Dashboard /> },
              { path: "student/:id", element: <StudentProfile /> },
              { path: "add-student", element: <AddStudent /> },
              { path: ":school/:course", element: <SchoolClass /> },
              { path: "chat", element: <Chat /> },
              { path: "estadisticas", element: <Statistics /> },
            ],
          },
        ],
      },
    ],
  },
];

// 4. Solución definitiva para el tipo del router
interface AppRouter extends ReturnType<typeof createBrowserRouter> {}
export const router: AppRouter = createBrowserRouter(routes);
