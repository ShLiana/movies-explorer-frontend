// MoviesCard — компонент одной карточки фильма
import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { movieDurationConverter } from "../../utils/utils";

const MoviesCard = ({
  movie,
  onSaveMovie,
  onDelete,
  checkLike,
  isMoviesPage,
}) => {
  const location = useLocation().pathname;
  const isLiked = checkLike(movie);

  // сохранить класс лайка в переменную moviesButtonClassName
  const moviesButtonClassName = isLiked
    ? "movies-card__like_active"
    : "movies-card__like";

  // заливка лайка, поставили лайк - фильм попал в сохраненные, убрали - удалился из сохраненных
  const onLike = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    onDelete(movie);
  };

  return (
    <li className="movies-card">
       <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU || movie.nameEN}</h2>
        <p className="movies-card__duration">
          {movieDurationConverter(movie.duration)}
        </p>
        {isMoviesPage ? (
          <button
            className={moviesButtonClassName}
            type="button"
            onClick={isLiked ? handleDeleteMovie : onLike}
          />
        ) : (
          <button
            className="movies-card__like movies-card__delete"
            type="button"
            onClick={handleDeleteMovie}
          />
        )}
      </div>
      <a
        href={movie.trailerLink}
        className="movies-card__image"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={
            location === "/movies"
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : `${movie.image}`
          }
          alt={`постер к фильму ${movie.nameRU || movie.nameEN}`}
        />
      </a>
     
    </li>
  );
};
export default MoviesCard;
