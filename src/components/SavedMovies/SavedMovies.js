// SavedMovies — компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movies';

const SavedMovies = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList movie={movies}/>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

