import React from "react";
import css from "./ErrorMessage.module.scss";
import ErrorMessageProps from "../../../interface/common/errorMessage";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <div className={css.errorMessage}>{message}</div>;
};
