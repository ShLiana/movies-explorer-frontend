import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import "./App.css";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import * as apiAuth from "../../utils/apiAuth";
import * as moviesApi from "../../utils/MoviesApi";
import { SEARCH_ERRORS, ERRORS_LIST } from "../../utils/errorsConstants";

function App() {
  // пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [dataEditingStatus, setDataEditingStatus] = useState("");
 // const [isTokenChecked, setIsTokenChecked] = useState(false);
 const [isCheckToken, setIsCheckToken] = useState(false);
  // фильмы
  const [allMovies, setAllMovies] = useState([]); // Все фильмы
  const [allFoundMoviesList, setAllFoundMoviesList] = useState([]); // Список найденных фильмов
  const [moviesFoundThroughSearchForm, setMoviesFoundThroughSearchForm] =
    useState([]); // Список фильмов найденных через форму поиска
  const [savedMovies, setSavedMovies] = useState([]); // стейт массива сохранённых фильмов - пустой массив зависимостей
  const [allMoviesShow, setAllMoviesShow] = useState(savedMovies);
  
  // ошибки
  const [errorText, setErrorText] = useState();
  const [isServerError, setIsServerError] = useState(false); // Произошла ошибка при поиске фильмов
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены
  const [isLoading, setIsLoading] = useState(false); // загрузка информации
  const [isNotFoundSaved, setIsNotFoundSaved] = useState(false);

  
  // добавили хук истории
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) checkToken();
  }, [loggedIn]);

  // проверка токена
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsCheckToken(true);
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
      .finally(() => setIsCheckToken(true));
    mainApi
      .getSavedMovies(jwt)
      .then(({ data }) => {
        setLoggedIn(true);
        setSavedMovies(data);
        setAllMoviesShow(data);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  };

  // Про пользователя - регистрация, атворизация, редактирование данных
  // Регистрация пользователя (name, email, password), после идет автоматическая авторизация
  const userRegistration = ({ name, email, password }) => {
    apiAuth
      .register({ name, email, password })
      .then(() => {
        userAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === "Ошибка: 500") {
          console.log(err);
          setErrorText(ERRORS_LIST.SERVER_ERROR_STATUS_500);
        }
        if (err === "Ошибка: 409") {
          console.log(err);
          setErrorText(ERRORS_LIST.REGISTRATION_ERROR_STATUS_409);
        } else {
          setErrorText(ERRORS_LIST.REGISTRATION_DEFAUTLT);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorText(""), 3000);
      });
  };

  // Авторизация пользователя
  const userAuthorization = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token); // в localStorage хранится токен
          checkToken();
          navigate("/movies"); // переадресация на страницу movies
        }
        Promise.all([mainApi.getUserInfo(), moviesApi.getAllMovies()]).then(
          ([userInfo, userMovies]) => {
           
            setCurrentUser(userInfo); // данные записываются в глобальную стейт-переменную
            localStorage.setItem("movies", JSON.stringify(userMovies));
            setAllMovies(JSON.parse(localStorage.getItem("movies")));
          }
        );
      })
      .catch((err) => {
        if (err === "Ошибка: 500") {
          setErrorText(ERRORS_LIST.SERVER_ERROR_STATUS_500);
        }
        if (err === "Ошибка: 401") {
          setErrorText(ERRORS_LIST.AUTHORIZATION_ERROR_STATUS_401);
        } else {
          setErrorText(ERRORS_LIST.AUTHORIZATION_DEFAULT);
        }
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setErrorText(""), 3000);
      });
  };

  // Редактировать данные пользователя
  const updateUserInfo = (data) => {
    setDataEditingStatus(true);
    const jwt = localStorage.getItem("jwt");
    mainApi
      .updateUserInfo(data, jwt)
      .then(() => {
        setCurrentUser(data);
        setDataEditingStatus(ERRORS_LIST.UPDATE_SUCCESS_STATUS);
        setTimeout(() => setDataEditingStatus(""), 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setDataEditingStatus(ERRORS_LIST.UPDATE_PROFILE_ERROR_STATUS);
        } else {
          setDataEditingStatus(ERRORS_LIST.UPDATE_DEFAULT_STATUS_400);
        }
      });
  };

  // Страница с фильмами
  // Отслеживание состояния стэйтов
  useEffect(() => {
    setKeywordSearch(localStorage.getItem("keywordSearch" || ""));
    setCheckboxSelected(
      localStorage.getItem("checkboxSelected" || "") === "true"
    );
    if (localStorage.getItem("moviesFoundThroughSearchForm")) {
      const movies = JSON.parse(
        localStorage.getItem("moviesFoundThroughSearchForm")
      );
      setAllFoundMoviesList(movies);
      if (movies.length === 0) {
        setIsNotFound(true);
      }
       else {
        setMoviesFoundThroughSearchForm(movies);
      }
    }
  }, []);

  // Ищем фильм по выбранным параметрам
  const userFilteredMovies = (movies, keyword, checkbox) => {
    setIsLoading(true);
    const moviesFilterList = searchMoviesList(movies, keyword, false);
    // если фильм не найден, то выходит сообщение об ошибке
    moviesFilterList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    setAllFoundMoviesList(moviesFilterList);
    // устанавливаем стейт moviesFilterList в зависимости от положения чекбокса
    setMoviesFoundThroughSearchForm(
      checkbox ? shortMoviesFiltered(moviesFilterList) : moviesFilterList
    );
    // создаём локальное хранилище moviesFoundThroughSearchForm
    localStorage.setItem(
      "moviesFoundThroughSearchForm",
      JSON.stringify(moviesFilterList)
    );
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Проверка поставлен ли лайк, если да, то фильм попадает в сохраненные
  const checkLike = (movie) => {
    return savedMovies.some((item) => item.movieId === movie.id);
  };

// Обработчик запроса на сохранение фильма - если лайк поставлен = фильм сохранен на странице "сохраненные фильмы"
const onLike = (movie) => {
  const jwt = localStorage.getItem("jwt");
  mainApi
    .addNewMovie(movie, jwt)
    .then(({ movie }) => {
      setSavedMovies([...savedMovies, movie]);
      setFilteredMoviesList([...savedMovies, movie]);
      console.log("Карточка создана:", movie);
    })
    .catch((err) => {
      console.log("Ошибка при создании карточки:", err);
    });
};

  // Обработка запроса по поиску фильма
  const userMovieRequest = (keyword) => {
    localStorage.setItem("searchKeyword", keyword); // Записываем набранное ключевое слово
    localStorage.setItem("checkboxSelected", checkboxSelected); // Записываем положение чекбокса
    if (allMovies.length === 0) {
      // если фильм отсутствует в сторедж нет, то направляем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem("allMovies", JSON.stringify(movies)); // Записываем полученные фильмы с BeatfilmMoviesApi
          setAllMovies(movies);
          userFilteredMovies(movies, keyword, checkboxSelected); // Получаем фильмы по запросу и выбранным параметрам
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    } else {
      userFilteredMovies(allMovies, keyword, checkboxSelected);
    }
  };

  // Обработчик запроса на удаления фильма с страницы 'Сохраненные фильмы'
  const deleteMovie = (movie) => {
    const jwt = localStorage.getItem("jwt");
    const deleteCard = savedMovies.find(
      (item) => item.movieId === (movie.id || movie.movieId)
    );
    if (!deleteCard) return;
    mainApi
      .deleteMovie(deleteCard._id, jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter((c) => c._id !== deleteCard._id));
        setFilteredMoviesList(
          savedMovies.filter((c) => c._id !== deleteCard._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Страница с сохраненными фильмами
  useEffect(() => {
    if (savedMovies.length === 0) return;
    if (moviesFoundThroughSearchForm.length === 0) {
      setErrorText(SEARCH_ERRORS.NOT_FOUND);
    } else {
      setErrorText("");
    }
  }, [moviesFoundThroughSearchForm, savedMovies, keywordSearch]);

  useEffect(() => {
    if (localStorage.getItem("checkboxSavedMovies") === "true") {
      setCheckboxSavedMovies(true);
      setAllMoviesShow(shortMoviesFiltered(savedMovies));
    } else {
      setCheckboxSavedMovies(false);
      setAllMoviesShow(savedMovies);
    }
  }, [savedMovies]);

  // Поиск на странице "Сохраненные фильмы"
  const searchSavedMovies = (keyword) => {
    console.log(savedMovies);
    const foundSavedMovies = searchMoviesList(
      savedMovies,
      keyword,
      checkboxSavedMovies
    );
    if (foundSavedMovies.length === 0) {
      setIsNotFoundSaved(true);
      setAllMoviesShow(foundSavedMovies);
      setFilteredMoviesList(foundSavedMovies);
    } else {
      setIsNotFoundSaved(false);
      setFilteredMoviesList(foundSavedMovies);
      setAllMoviesShow(foundSavedMovies);
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCheckboxSavedMovies(false);
      setAllMoviesShow(savedMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // обработчик выхода пользователя из аккаунта, очистка localStorage
  const logOut = () => {
    // очистить localStorage
    localStorage.clear();
    // сбрасываем все стейты
    setLoggedIn(false);
    setIsCheckToken(false);
    setCurrentUser({});
    checkToken(null);
    setIsLoading(false);
    setAllFoundMoviesList([]);
    setSavedMovies([]);
    setMoviesFoundThroughSearchForm(false);
    setCheckboxSelected(false);
    setKeywordSearch("");
    setMoviesFoundThroughSearchForm([]);
    setIsNotFoundSaved(false);
    setIsNotFound(false);
    // переход на главную страницу
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isTokenChecked={isCheckToken}
                movies={moviesFoundThroughSearchForm}
                isLoading={isLoading}
                onSaveMovie={onLike}
                onCheckbox={changeCheckbox}
                checked={checkboxSelected}
                checkLike={checkLike}
                onSubmit={userMovieRequest}
                isNotFound={isNotFound}
                isServerError={isServerError}
                savedMovies={savedMovies}
                onDelete={deleteMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isTokenChecked={isCheckToken}
                movies={allMoviesShow}
                onSubmit={searchSavedMovies}
                onCheckbox={changeCheckboxSlidersSavedMovies}
                checkLike={checkLike}
                saveMovie={savedMovies}
                isNotFound={isNotFoundSaved}
                checked={checkboxSavedMovies}
                onDelete={deleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isTokenChecked={isCheckToken}
                updateInfoAboutUser={updateUserInfo}
                setErrorText={setErrorText}
                dataEditingStatus={dataEditingStatus}
                logOut={logOut}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={userAuthorization}
                loggedIn={loggedIn}
                isTokenChecked={isCheckToken}
                errorText={errorText}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={userRegistration}
                loggedIn={loggedIn}
                isTokenChecked={isCheckToken}
                errorText={errorText}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
