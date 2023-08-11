//Register — компонент страницы регистрации
import React from 'react';
import Authorization from '../Authorization/Authorization';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import ButtonSubmitAuth from '../ButtonSubmitAuth/ButtonSubmitAuth';
import Form from '../Form/Form';

const Register = () => {
  return (
    <Authorization
      title='Добро пожаловать!'
      subtitle='Уже зарегистрированы?'
      route='/signin'
      link='Войти'
    >
      <Form>
        <AuthorizationForm
          placeholder='Имя'
          id='name'
          name='name'
          type='text'
          error=''
          minLength='2'
          maxLength='40'
          required
        />
        <AuthorizationForm
          placeholder='E-mail'
          id='email'
          name='email'
          type='email'
          minLength='8'
          maxLength='30'
          error=''
          required
        />
        <AuthorizationForm
          placeholder='Пароль'
          id='password'
          type='password'
          name='password'
          minLength='8'
          maxLength='30'
          error='Что-то пошло не так...'
          required
        />
      </Form>
      <ButtonSubmitAuth text='Зарегистрироваться' />
    </Authorization>
  );
};

export default Register;

