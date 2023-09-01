export const BASE_URL = 'http://api.movies-app.nomoredomains.work';
export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

//проверяем ответ с сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// длительность короткометражек в минутах
export const shortMoviesDuration = 40;

