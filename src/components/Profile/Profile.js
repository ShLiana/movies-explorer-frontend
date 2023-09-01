// Profile — компонент страницы изменения профиля
import React from "react";
import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import ButtonSubmitAuth from "../ButtonSubmitAuth/ButtonSubmitAuth";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  loggedIn,
  updateInfoAboutUser,
  logOut,
  dataEditingStatus,
}) => {
  const { values, isValid, setValues, handleChange,  resetForm, errors } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  // переменная состояния режима ввода данных в инпуты
  const [isDataEntryMode, setIsDataEntryMode] = useState(false);
  // Переменная состояния активного состояния кнопки
  const [isActiveButtonMode, setIsActiveButtonMode] = useState(false);
  

  const inactiveButtonMode =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  // отобразить актуальную информацию о текущем пользователе
  useEffect(() => {
    setIsDataEntryMode(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues, setIsDataEntryMode]);

  // Передаём значения управляемых компонентов во внешний обработчик
  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      updateInfoAboutUser({
        name: values.name,
        email: values.email,
      });
      resetForm();
    }
  }

  function editUserData() {
    setIsDataEntryMode(true);
  }

  function savedModeButton() {
    setIsActiveButtonMode(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__greeting">Привет, {currentUser.name}!</h3>
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <div className="profile__info">
            <label className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              id="name"
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={values?.name ?? currentUser.name}
              disabled={isDataEntryMode ? false : true}
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__info">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input"
              id="email"
              type="text"
              name="email"
              placeholder="Ваш email"
              value={values?.email ?? currentUser.email}
              disabled={isDataEntryMode ? false : true}
              onChange={handleChange}
              required
            />
          </div>
          <span className='profile__form_error-warning'>{errors.email || ''}</span>
          {isActiveButtonMode && <p className="profile__form"> {dataEditingStatus}</p>}
          <div className="profile__button-container">
            {!isDataEntryMode ? (
              <>
                <button
                  className="profile__button profile__button_edit"
                  type="button"
                  onClick={editUserData}
                >
                  Редактировать
                </button>
                <button
                  className="profile__button profile__button_exit"
                  type="button"
                  onClick={logOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <ButtonSubmitAuth
                type="submit"
                text="Сохранить"
                disabled={inactiveButtonMode}
                onClick={savedModeButton}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
