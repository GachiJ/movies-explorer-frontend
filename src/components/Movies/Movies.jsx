import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {

  function filterMovies(movies, query) {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
  
      return (
        (nameRULowerCase.includes(lowerCaseQuery) ||
         nameENLowerCase.includes(lowerCaseQuery)) &&
        ( movie.duration <= 40)
      );
    });

  
    return filteredMovies;
  }


  return (
    <main className="main">
      <SearchForm
        onSearchMovies={filterMovies}
        movies={movies}
      />
      {/*   <Preloader /> */}
      <MoviesCardList
        movies={movies}
        savedMoviesList={savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={false}
      />
    </main>
  );
};