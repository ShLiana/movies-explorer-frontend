// Содержит описание запросов к нашему Api

import { checkResponse, BASE_URL } from './Constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Получить информацию о пользователе с сервера
export const getUserInfo = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

// Обновить информацию о пользователе
export const updateUserInfo = (data, jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};

// Получить все сохраненные фильмы пользователя
export const getSavedMovies = (jwt) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

// Cохранить фильмы пользователя
export const addNewMovie = (movie, jwt) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || 'нет данных',
      nameEN: movie.nameEN || 'нет данных',
    }),
  }).then((res) => checkResponse(res));
};

// функция удаления фильма из БД по его id (смотреть бэк)
export const deleteMovie = (id, jwt) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};



