// SavedMovies — компонент страницы с сохранёнными карточками фильмов
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({
  loggedIn,
  movies,
  onLike,
  onDelete,
  checkLike,
  onSubmit,
  isNotFound,
  savedMovies,
  checkbox,
  isChecked,
}) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm
          onCheckbox={checkbox}
          checked={isChecked}
          onSubmit={onSubmit}
        />
        <MoviesCardList
          movies={movies}
          checkLike={checkLike}
          isNotFound={isNotFound}
          onLike={onLike}
          savedMovies={savedMovies}
          onDelete={onDelete}
          isMoviesPage={false}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
