import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete, isSaved}) {
  return (
    <main className="main">
      <SearchForm />
      {/*   <Preloader /> */}
      <MoviesCardList
          movies={movies}
          savedMoviesList={savedMoviesList}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          isSaved={isSaved}
      />
    </main>
  );
};