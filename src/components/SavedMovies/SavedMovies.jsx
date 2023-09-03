import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let filteredMovies = savedMoviesList;

    if (query) {
      filteredMovies = filteredMovies.filter((movie) => {
        const lowerCaseQuery = query.toLowerCase();
        const nameRULowerCase = movie.nameRU.toLowerCase();
        const nameENLowerCase = movie.nameEN.toLowerCase();
        return (
          (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
          (!movie.duration || (movie.duration && movie.duration <= 40))
        );
      });
    }

    setFilteredMovies(filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
  }, [savedMoviesList, query]);

  function handleSearch(filteredMovies) {
    setFilteredMovies(filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    setQuery(newQuery);
  }

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        moviesToFilter={location.pathname === '/movies' ? movies : savedMoviesList}
        query={query}
        onQueryChange={handleQueryChange}
      />
      {isSearchEmpty && (
        <p className="movies__empty">Ничего не найдено</p>
      )}
      {!isSearchEmpty && (
        <MoviesCardList
          movies={movies}
          savedMoviesList={filteredMovies}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          isSaved={true}
        />
      )}
    </main>
  );
};