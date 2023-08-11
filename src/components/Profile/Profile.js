// Profile — компонент страницы изменения профиля
import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import myPersonalData from "../../utils/myPersonalData";


function Profile() {
  const { name, email } = myPersonalData;

  return (
    <>
      <Header isLoggedIn={true} />
      <section className='profile'>
        <h3 className='profile__greeting'>{`Привет, ${name}!`}</h3>
        <form className='profile__form'>
          <div className='profile__info'>
            <label className='profile__label'>Имя</label>
            <input
              className='profile__input'
              id='name'
              type='text'
              name='name'
              placeholder='Ваше имя'
              value={name || ""}
              disabled={true}
              required
              minLength='2'
              maxLength='40'
            />
          </div>
          <div className='profile__line'></div>
          <div className='profile__info'>
            <label className='profile__label'>E-mail</label>
            <input
              className='profile__input'
              id='email'
              type='text'
              name='email'
              placeholder='Ваш email'
              value={email || ""}
              required
            />
          </div>
          <div className='profile__button-container'>
            <button
              className='profile__button profile__button_edit'
              type='button'
            >
              Редактировать
            </button>
            <button
              className='profile__button profile__button_exit'
              type='button'
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;

