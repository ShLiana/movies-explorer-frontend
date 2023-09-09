//Movies — компонент страницы с поиском по фильмам
import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import {
  count_of_cards_1280,
  count_of_cards_768,
  count_of_cards_480,
  count_of_added_cards_1,
  count_of_added_cards_2,
  screen_width_768,
  screen_width_480,
} from "../../utils/screenWidthConstants";
import { useWindowWidth } from "../../hooks/useWindowWidth";

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
  const currentScreenWidth = useWindowWidth(); // получили текущую ширину экрана
  const [cardCounterOnMoreButton, setCardCounterOnMoreButton] = useState(0); // стейт счетчика добавленных фильмов при нажатии на "еще"
  const [moviesCardList, setMoviesCardList] = useState(0); // стейт отображаемых на экране карточек с фильмами

  // useEffect с условиями демонстрации количества карточек в зависимости от ширины экрана
  useEffect(() => {
    // если текущая ширина экрана больше 768px, то добавляем 4 ряда + 1 ряд
    if (currentScreenWidth > screen_width_768) {
      setMoviesCardList(count_of_cards_1280);
      setCardCounterOnMoreButton(count_of_added_cards_1);
    }
    // если текущая ширина экрана меньше 768px, но больше 480 px, то добавляем 4 ряда + 1 ряд
    if (
      currentScreenWidth < screen_width_768 &&
      currentScreenWidth > screen_width_480
    ) {
      setMoviesCardList(count_of_cards_768);
      setCardCounterOnMoreButton(count_of_added_cards_1);
    }
    // если текущая ширина экрана меньше или равна 480 px, то добавляем 5 рядов + 2 ряда
    if (currentScreenWidth <= screen_width_480) {
      setMoviesCardList(count_of_cards_480);
      setCardCounterOnMoreButton(count_of_added_cards_2);
    }
  }, [currentScreenWidth, movies]);

  // обработчик нажатий на кнопку 'Ещё'
  const showMoreMoviesButton = () => {
    setMoviesCardList(moviesCardList + cardCounterOnMoreButton);
  };

  const searchKeyword = localStorage.getItem("searchKeyword") || "";
 
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          onCheckbox={onCheckbox}
          checked={checked}
          defaultValue={searchKeyword}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies.slice(0, moviesCardList)}
            isNotFound={isNotFound}
            isServerError={isServerError}
            onSaveMovie={onSaveMovie}
            checkLike={checkLike}
            savedMovies={savedMovies}
            isMoviesPage={true}
            onDelete={onDelete}
          />
        )}

        {!(movies.length <= moviesCardList) && (
          <button
            className="movies__more-button"
            onClick={showMoreMoviesButton}
            aria-label="Добавить больше фильмов на страницу"
            type="button"
          >
            Ещё
          </button>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
