//Movies — компонент страницы с поиском по фильмам
import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";
import Preloader from "../Preloader/Preloader";

const isLoading = false;

const Movies = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList movie={movies} />}
        <button
          className="movies__more-button"
          type="button"
          aria-label="Добавить больше фильмов на страницу"
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
