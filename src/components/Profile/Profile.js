// Profile — компонент страницы изменения профиля
import React from "react";
import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
//import myPersonalData from "../../utils/myPersonalData";
import ButtonSubmitAuth from "../ButtonSubmitAuth/ButtonSubmitAuth";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  loggedIn,
  updateInfoAboutUser,
  logOut,
  dataEditingStatus,
}) => {
  const { values, handleChange, isValid, setValues, resetForm } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  //Переменные состояния активного состояния кнопки
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const inactiveButton =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  // отобразить актуальную информацию о текущем пользователе
  useEffect(() => {
    setIsInputDisabled(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues, setIsInputDisabled]);

  // Передаём значения управляемых компонентов во внешний обработчик
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    if (isValid) {
      updateInfoAboutUser({
        name: values.name,
        email: values.email,
      });
      resetForm();
    }
  }

  function handleEditProfileInfo() {
    setIsInputDisabled(true);
  }

  function handleSaveFunction() {
    setIsSuccess(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__greeting">Привет, {currentUser.name}!</h3>
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <div className="profile__info">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input"
              id="name"
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={values?.name ?? currentUser.name}
              disabled={isInputDisabled ? false : true}
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
              disabled={isInputDisabled ? false : true}
              onChange={handleChange}
              required
            />
          </div>
          {isSuccess && <p className="profile__form"> {dataEditingStatus}</p>}
          <div className="profile__button-container">
            {!isInputDisabled ? (
              <>
                <button
                  className="profile__button profile__button_edit"
                  type="button"
                  onClick={handleEditProfileInfo}
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
                disabled={inactiveButton}
                onClick={handleSaveFunction}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
