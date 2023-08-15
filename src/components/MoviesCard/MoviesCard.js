// MoviesCard — компонент одной карточки фильма
import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const { pathLocationName } = useLocation();

  const [isLiked, setIsLiked] = React.useState(false);

  function handleCardLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{movie.title}</h2>
        <p className='movies-card__duration'>{movie.duration}</p>
        {pathLocationName === '/saved-movies' ? (
          <button className='movies-card__delete' type='button' aria-label='Удалить фильм из избранного'></button>
        ) : (
          <button
            className={`movies-card__like ${
              isLiked ? 'movies-card__like_active' : ''
            }`}
            type='button'
            aria-label='Добавить фильм в избранное'
            onClick={handleCardLikeClick}
          ></button>
        )}
      </div>
      <img className='movies-card__image' src={movie.image} alt={movie.title} />
    </li>
  );
}
export default MoviesCard;