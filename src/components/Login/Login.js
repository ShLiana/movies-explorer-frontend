//Login — компонент страницы авторизации
import React from "react";
import Authorization from "../Authorization/Authorization";
import Form from "../Form/Form";
//import ButtonSubmitAuth from '../ButtonSubmitAuth/ButtonSubmitAuth';
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { Navigate } from "react-router-dom";

const Login = ({ onLogin, errorText, loggedIn }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  // обработчик отправки данных из формы
  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!values.password || !values.email) {
      // если не введен email или password - ничего не возвращаем
      return;
    }
    onLogin(values);
  };

  if (loggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <Authorization
        title="Рады видеть!"
        subtitle="Ещё не зарегистрированы?"
        route="/signup"
        link="Регистрация"
      >
        <Form
          onSubmit={handleSubmit}
          errorText={errorText || ""}
          text="Войти"
          disabled={!isValid}
        >
          <AuthorizationForm
            placeholder="E-mail"
            id="email"
            type="email"
            name="email"
            minLength="8"
            maxLength="40"
            required
            value={values.email}
            error={errors.email || ""}
            onChange={handleChange}
          />
          <AuthorizationForm
            placeholder="Пароль"
            id="password"
            type="password"
            name="password"
            minLength="8"
            maxLength="40"
            required
            value={values.password}
            error={errors.password || ""}
            onChange={handleChange}
          />
        </Form>
      </Authorization>
    </>
  );
};

export default Login;
