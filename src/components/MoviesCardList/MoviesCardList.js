//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList ( {movie} ) {
  return (
    <section className="movies-cards-list">
      <ul className="movies-cards-list__items">
      {movie.map((item) => (
        <MoviesCard key={item._id} movie={item} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
