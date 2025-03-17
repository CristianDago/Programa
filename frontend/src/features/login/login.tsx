import { useState, useEffect } from "react";
import { useAuth } from "../../components/auth/authContext";
import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/common/grid/grid";
import { LoginForm } from "./loginForm";
import { authenticateUser } from "../../utils/authUtils";
import css from "./loginForm.module.scss";

export default function Login() {
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const goTo = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      goTo("/dashboard");
    }
  }, [auth.isAuthenticated, goTo]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorResponse(null);

    try {
      const token = await authenticateUser(email, password);
      auth.login(token);
      goTo("/dashboard");
    } catch (error: any) {
      setErrorResponse(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid className={css.loginContainer}>
      <LoginForm
        onSubmit={handleLogin}
        errorMessage={errorResponse}
        isLoading={isLoading}
      />
    </Grid>
  );
}
