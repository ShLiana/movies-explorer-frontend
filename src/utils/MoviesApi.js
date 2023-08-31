// Содержит описание запросов к сервису beatfilm-movies

import { checkResponse, MOVIE_URL } from './Constants';

// функция получения фильмов с сервера BeatfilmMoviesApi

export const getAllMovies = () => {
  return fetch(`${MOVIE_URL}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};