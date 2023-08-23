import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
//import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import * as apiAuth from '../../utils/apiAuth';

function App() {
  // Стейты состояния пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setIsCurrentUser] = useState();
  const [isEditUserInfoStatus, setIsEditUserInfoStatus] = useState('');
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  // Стейты ошибок
  const [isError, setIsError] = useState('');
  
  //добавили хук истории
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn)
    checkToken();
  }, [loggedIn]);

  // проверка токена
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsTokenChecked(true);
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setIsCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
      .finally(() => setIsTokenChecked(true));
  };

  // Регистрация пользователя
  const handleUserRegistration = ({ name, email, password }) => {
    apiAuth
      .register({ name, email, password })
      .then(() => {
        handleUserAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          console.log(err);
          setIsError('На сервере произошла ошибка');
        }
        if (err === 'Ошибка: 409') {
          console.log(err);
          setIsError('Пользователь с таким email уже существует');
        } else {
          setIsError('Переданы некорректные данные')
        }
      })
      .finally(() => {
        setTimeout(() => setIsError(''), 5000);
      });
  };

  // Авторизация пользователя
  const handleUserAuthorization = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token); // в localStorage хранится токен
          checkToken();
          navigate('/movies'); // переадресация на страницу movies
        }
        Promise.all([mainApi.getUserInfo()]).then(
          ([userInfo]) => {
            console.log(userInfo);
           
            setIsCurrentUser(userInfo); // данные записываются в глобальную стейт-переменную
         
          
          }
        );
      })
    
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          console.log(err);
          setIsError('На сервере произошла ошибка');
        }
        if (err === 'Ошибка: 401') {
          console.log(err);
          setIsError('Вы ввели неправильный email или пароль');
        } else {
          setIsError('Что-то пошло не так...')
        }
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setIsCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setIsError(''), 3000);
      })
  };

  // Изменяем данные пользователя
  const handleUpdateUser = (data) => {
    const jwt = localStorage.getItem('jwt');
    mainApi
      .updateUserInfo(data, jwt)
      .then(() => {
        setIsCurrentUser(data);
        setTimeout(() => setIsEditUserInfoStatus(''), 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          setIsError('Ошибка 409');
        } else {
          setIsError('Ошибка 400');
        }
      })
  };
//   // -------------------------SAVEDMOVIES----------------------------- //

  // обработчик выхода пользователя из аккаунта, обращение к API, очистка локального хранилища
  const handleLogOut = () => {
   localStorage.clear(); // удаление данных из localstorage
    // сбрасываем все стейты при разлогинивании
    setLoggedIn(false);
    checkToken(null);
    setIsCurrentUser({});
    setIsTokenChecked(false);
    // переадресация на главную страницу
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
       
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                onUpdateUser={handleUpdateUser}
                isError={isError}
                isEditUserInfoStatus={isEditUserInfoStatus}
                logOut={handleLogOut}
                
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleUserAuthorization}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                isError={isError}
                isEditUserInfoStatus={isEditUserInfoStatus}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleUserRegistration}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                isError={isError}
                isEditUserInfoStatus={isEditUserInfoStatus}
              />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
