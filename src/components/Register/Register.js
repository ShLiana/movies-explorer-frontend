//Register — компонент страницы регистрации
import React from "react";
import Authorization from "../Authorization/Authorization";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
//import ButtonSubmitAuth from "../ButtonSubmitAuth/ButtonSubmitAuth";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { Navigate } from "react-router-dom";

const Register = ({ onRegister, errorMessage, isLoggedIn }) => {
  const { values, handleChange, errors, isValid, resetForm } =
  useFormWithValidation();

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    onRegister(values);
    resetForm();
  };

  if (isLoggedIn) return <Navigate to='/' replace />;

  return (
    <>
    <Authorization
      title="Добро пожаловать!"
      subtitle='Уже зарегистрированы?'
      route='/signin'
      link='Войти'
    >
      <Form
        onSubmit={handleSubmit}
        errorMessage={errorMessage || ''}
        text='Зарегистрироваться'
        disabled={!isValid}
      >
        <AuthorizationForm
          placeholder='Имя'
          //label='Имя'
          id='name'
          name='name'
          type="text"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ''}
          error={errors.name || ''}
          onChange={handleChange}
        />
        <AuthorizationForm
          placeholder="E-mail"
          //label='E-mail'
          id="email"
          name="email"
          type="email"
          minLength="6"
          maxLength="30"
          required
          value={values.email || ""}
          error={errors.email || ""}
          onChange={handleChange}
        />
        <AuthorizationForm
          placeholder="Пароль"
          //label='Пароль'
          id="password"
          type="password"
          name="password"
          minLength="8"
          maxLength="30"
          required
          value={values.password || ""}
          error={errors.password || ""}
          onChange={handleChange}
        />
      </Form>
    </Authorization>
  </>
  );
};

export default Register;
