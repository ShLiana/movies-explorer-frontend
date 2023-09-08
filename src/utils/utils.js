import { shortMoviesDuration } from "../utils/Constants";

// функция преобразования длительности фильмов
export const movieDurationConverter = (counter) => {
  const durationInMinutes = counter % 60;
  const durationInHours = (counter - durationInMinutes) / 60;
  if (durationInHours === 0) {
    return `${durationInMinutes}м`;
  } else if (durationInMinutes === 0) {
    return `${durationInHours}ч`;
  } else {
    return `${durationInHours}ч ${durationInMinutes}м`;
  }
};

// обработчик поискового запроса по ключевому слову
export const searchMoviesList = (movies, keyword, checkbox) => {
  const moviesSearchКeyword = movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  if (checkbox) {
    return shortMoviesFiltered(moviesSearchКeyword);
  } else {
    return moviesSearchКeyword;
  }
};

// фильтр короткометражек
export const shortMoviesFiltered = (movies) => {
  return movies.filter((movie) => movie.duration <= shortMoviesDuration);
};
