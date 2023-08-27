import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  return (
    <main className="main">
      <SearchForm />
      {/*   <Preloader /> */}
      <MoviesCardList
        movies={movies}
        savedMoviesList={savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
      />
    </main>
  );
};