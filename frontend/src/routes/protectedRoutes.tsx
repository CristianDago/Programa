import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth/authContext";
import ProtectedLayout from "../components/layouts/protected-layout/protectedLayout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <ProtectedLayout/>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
