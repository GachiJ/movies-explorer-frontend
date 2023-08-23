import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';

export default function Movies({ pageLocation, movies, savedMoviesList, onCardSave, onCardDelete, isSaved }) {
  return (
    <main className="main">
      <SearchForm />
      {/*   <Preloader /> */}
      <MoviesCardList
        pageLocation={pageLocation}
        movies={movies}
        savedMoviesList={savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={isSaved}
      />
    </main>
  );
};