// Navigation — компонент, который отвечает за меню навигации на сайте
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import profileIcon from '../../images/profile-icon.svg';

const Navigation = ({ isLoggedIn }) => {
  const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);

  const closeBurgerMenuClicked = () => {
    setIsBurgerMenuClicked(false);
  };

  const openBurgerMenuClicked = () => {
    setIsBurgerMenuClicked(true);
  };

  return (
    <nav className='navigation'>
      {!isLoggedIn ? (
        <>
          <div className='navigation__authorization'>
            <NavLink to='/signup' className='navigation__authorization-link'>
              Регистрация
            </NavLink>
            <NavLink
              to='signin'
              className='navigation__authorization-link navigation__authorization-link_active'
            >
              Войти
            </NavLink>
          </div>
        </>
      ) : (
        <div className='navigation__movies'>
          <NavLink className='navigation__movies-link' to='/movies'>
            Фильмы
          </NavLink>
          <NavLink className='navigation__movies-link' to='/saved-movies'>
            Сохранённые фильмы
          </NavLink>
          <NavLink className='navigation__account' to='/profile'>
            <button className='navigation__button_type_account' type='button'>
              Аккаунт
            </button>
            <img
              className='navigation__profile-icon'
              src={profileIcon}
              alt='Фотография пользователя'
            ></img>
          </NavLink>
          <button
            className='navigation__button_type_burger-menu'
            type='button'
            onClick={openBurgerMenuClicked}
          />
        </div>
      )}
      <BurgerMenu
        isOpen={isBurgerMenuClicked}
        onClose={closeBurgerMenuClicked}
      />
    </nav>
  );
};

export default Navigation;
