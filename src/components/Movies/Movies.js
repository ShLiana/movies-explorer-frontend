//Movies — компонент страницы с поиском по фильмам
import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";


const Movies = ({
  loggedIn,
  onSubmit,
  isLoading,
  isNotFound,
  isServerError,
  movies,
  onCheckbox,
  checked,
  checkLike,
  savedMovies,
  onSaveMovie,
  onDelete,
}) => {
  
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          onCheckbox={onCheckbox}
          checked={checked}
        
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
           
            isNotFound={isNotFound}
            isServerError={isServerError}
            onSaveMovie={onSaveMovie}
            checkLike={checkLike}
            savedMovies={savedMovies}
            isMoviesPage={true}
            onDelete={onDelete}
          />
        )}

      
          <button
            className="movies__more-button"
           // onClick={showMoreMoviesButton}
            aria-label="Добавить больше фильмов на страницу"
            type="button"
          >
            Ещё
          </button>
 
      </main>
      <Footer />
    </>
  );
};

export default Movies;
