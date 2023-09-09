// Navigation — компонент, который отвечает за меню навигации на сайте
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import profileIcon from "../../images/profile-icon.svg";

const Navigation = ({ loggedIn }) => {
  const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);

  const closeBurgerMenuClicked = () => {
    setIsBurgerMenuClicked(false);
  };

  const openBurgerMenuClicked = () => {
    setIsBurgerMenuClicked(true);
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <nav className="navigation">
            <div className="navigation__authorization">
              <Link to="/signup" className="navigation__authorization-link">
                Регистрация
              </Link>
              <Link
                to="signin"
                className="navigation__authorization-link navigation__authorization-link_active"
              >
                Войти
              </Link>
            </div>
          </nav>
        </>
      ) : (
        <nav className="navigation">
          <div className="navigation__movies">
            <NavLink to="/movies" className="navigation__movies-link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__movies-link ">
              Сохранённые фильмы
            </NavLink>
            <nav className="navigation__account">
              <Link to="/profile">
                <button className="navigation__account-button" type="button">
                  Аккаунт
                </button>
                <img
                  className="navigation__profile-icon"
                  src={profileIcon}
                  alt="Фотография пользователя"
                ></img>
              </Link>
            </nav>
            <button
              className="navigation__account-burger-menu-button"
              type="button"
              onClick={openBurgerMenuClicked}
            />
          </div>
        </nav>
      )}
      <BurgerMenu
        isOpen={isBurgerMenuClicked}
        onClose={closeBurgerMenuClicked}
      />
    </>
  );
};

export default Navigation;
