import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes"; // Importa ProtectedRoute

const Signup = lazy(() => import("../pages/signup/signup"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));
const StudentProfile = lazy(() => import("../pages/student-profile/studentProfile"));
const AddStudent = lazy(() => import("../pages/add-student/addStudent"));
const LoginPage = lazy(() => import("../pages/login/loginPage"));
const SchoolClass = lazy(() => import("../pages/school-class/schoolClass"));
const Statistics = lazy(() => import("../pages/statistics/statistics")); 
const Chat = lazy(() => import("../pages/chat/chat")); // Importa Chat

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "student/:id",
        element: <StudentProfile />,
      },
      {
        path: "add-student",
        element: <AddStudent />,
      },
      {
        path: ":school/:course",
        element: <SchoolClass />,
      },
      {
        path: "chat", // Nueva ruta para Chat
        element: <Chat />,
      },
      {
        path: "estadisticas", // Nueva ruta para Chat
        element: <Statistics />,
      },
    ],
  },
]);