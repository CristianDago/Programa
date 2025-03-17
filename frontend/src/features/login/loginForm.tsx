import React, { useState } from "react";
import { InputField } from "../../components/common/input-field/InputField";
import { ErrorMessage } from "../../components/common/error-message/ErrorMessage";
import css from "./loginForm.module.scss";
import LoginFormProps from "../../interface/login/loginFormProps";
import logo from "../../assets/images/LOGO-escuelas.png";

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  errorMessage,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit}>
      <div className={css.inputTitle}>
        <img src={logo} alt="logo" className={css.logo} />
        <h2>Inicio de sesión</h2>
      </div>

      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={css.loginButton} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Entrar"}
      </button>
      <ErrorMessage message={errorMessage} />
    </form>
  );
};
