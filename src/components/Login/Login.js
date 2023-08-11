//Login — компонент страницы авторизации
import React from 'react';
import Authorization from '../Authorization/Authorization';
import Form from '../Form/Form';
import ButtonSubmitAuth from '../ButtonSubmitAuth/ButtonSubmitAuth';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';

const Login = () => {
  return (
    <Authorization
      title='Рады видеть!'
      subtitle='Ещё не зарегистрированы?'
      route='/signup'
      link='Регистрация'
    >
      <Form>
        <AuthorizationForm
          placeholder='E-mail'
          id='email'
          type='email'
          minLength='8'
          maxLength='40'
          required
        />
        <AuthorizationForm
          placeholder='Пароль'
          id='password'
          type='password'
          minLength='8'
          maxLength='40'
          required
        />
      </Form>
      <ButtonSubmitAuth text='Войти' />
    </Authorization>
  );
};

export default Login;

