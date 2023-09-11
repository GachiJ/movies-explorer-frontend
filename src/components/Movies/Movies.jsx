import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MAX_MOVIE_DURATION, DEFAULT_SEARCH_QUERY,
  LOCATION_MOVIES_PATH, LOCAL_STORAGE_MOVIES_SEARCH_QUERY,
  LOCAL_STORAGE_IS_SHORT_MOVIES_CHECKED
} from '../../utils/constants'

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete, isLoader }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  function filterMovies(query, shortMovies) {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= MAX_MOVIE_DURATION))
      );
    });
    setFilteredMovies(filteredMovies);
    return filteredMovies || [];
  }

  useEffect(() => {
    if (location.pathname === LOCATION_MOVIES_PATH) {
      const savedSearchQuery = localStorage.getItem(LOCAL_STORAGE_MOVIES_SEARCH_QUERY);
      const savedIsShortMoviesChecked = localStorage.getItem(LOCAL_STORAGE_IS_SHORT_MOVIES_CHECKED);

      const initialSearchQuery = savedSearchQuery || DEFAULT_SEARCH_QUERY;
      setQuery(initialSearchQuery);

      const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
      setIsShortMoviesChecked(initialIsShortMoviesChecked);

      // Вызываем функцию filterMovies с аргументами из хранилища
      filterMovies(initialSearchQuery, initialIsShortMoviesChecked);
    }
  }, [location, movies]);

  function handleSearch(query, shortMovies) {
    const filteredMovies = filterMovies(query, shortMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleShortMoviesChange(query, newShortMovies) {
    const filteredMovies = filterMovies(query, newShortMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    setQuery(newQuery);
    localStorage.setItem(LOCAL_STORAGE_MOVIES_SEARCH_QUERY, newQuery);
  }

  return (
    <main className="main">
      <Preloader isLoader={isLoader} />
      <SearchForm
        onSearch={handleSearch}
        query={query}
        onQueryChange={handleQueryChange}
        isShortMoviesChecked={isShortMoviesChecked}
        isSaved={false}
        onShortMoviesChange={handleShortMoviesChange}
      />
      {isSearchEmpty && (
        <p className="movies__empty">Ничего не найдено</p>
      )}
      {!isSearchEmpty && (
        <MoviesCardList
          movies={filteredMovies}
          savedMoviesList={savedMoviesList}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          isSaved={false}
        />
      )}
    </main>
  );
};