//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { SEARCH_ERRORS } from "../../utils/errorsConstants";

const MoviesCardList = ({
  movies,
  checkLike,
  onDelete,
  onSaveMovie,
  isMoviesPage,
  isNotFound,
  isServerError,
}) => {
  return (
    <section className="movies-cards-list">
      <p
        className={
          isNotFound
            ? "movies-cards-list__error-warning_active"
            : "movies-cards-list__error-warning"
        }
      >
        {SEARCH_ERRORS.NOT_FOUND}
      </p>
      <p
        className={
          isServerError ? "movies-cards-list__error-warning_active" : "movies-cards-list__error-warning"
        }
      >
        {SEARCH_ERRORS.SEARCH_ERROR_STATUS}
      </p>
      <ul className="movies-cards-list__items">
        {movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            isMoviesPage={isMoviesPage}
            checkLike={checkLike}
            onDelete={onDelete}
            onSaveMovie={onSaveMovie}
          />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;
