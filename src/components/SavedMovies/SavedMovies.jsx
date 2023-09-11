import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';
import { MAX_MOVIE_DURATION, DEFAULT_SEARCH_QUERY, 
  LOCATION_SAVED_MOVIES_PATH, LOCAL_STORAGE_SAVED_MOVIES_SEARCH_QUERY, 
  LOCAL_STORAGE_IS_SAVED_SHORT_MOVIES_CHECKED } from '../../utils/constants'

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState('');
  const [isSavedShortMoviesChecked, setIsSavedShortMoviesChecked] = useState(false);

  function filterMovies(savedMoviesSearchQuery, shortMovies) {
    const filteredMovies = savedMoviesList.filter((movie) => {
      const lowerCaseQuery = savedMoviesSearchQuery.toLowerCase();
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
    if (location.pathname === LOCATION_SAVED_MOVIES_PATH) {
      const savedSearchQuery = localStorage.getItem(LOCAL_STORAGE_SAVED_MOVIES_SEARCH_QUERY);
      const savedIsShortMoviesChecked = localStorage.getItem(LOCAL_STORAGE_IS_SAVED_SHORT_MOVIES_CHECKED);

      const initialSearchQuery = savedSearchQuery || DEFAULT_SEARCH_QUERY;
      setSavedMoviesSearchQuery(initialSearchQuery);

      const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
      setIsSavedShortMoviesChecked(initialIsShortMoviesChecked);

      const filteredMovies = filterMovies(initialSearchQuery, initialIsShortMoviesChecked);
      setIsSearchEmpty(filteredMovies.length === 0);
      localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
    }
  }, [location, savedMoviesList]);

  function handleSearch(savedMoviesSearchQuery, shortMovies) {
    console.log(savedMoviesSearchQuery, shortMovies);
    const filteredMovies = filterMovies(savedMoviesSearchQuery, shortMovies);
    console.log('filterMovie', filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleShortMoviesChange(query, newShortMovies) {
    console.log(query, newShortMovies);
    const filteredMovies = filterMovies(query, newShortMovies);
    console.log('filterMovie', filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    console.log('поиск сохраненные фильмы', newQuery);
    setSavedMoviesSearchQuery(newQuery);
    localStorage.setItem(LOCAL_STORAGE_SAVED_MOVIES_SEARCH_QUERY, newQuery);
  }

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        query={savedMoviesSearchQuery}
        onQueryChange={handleQueryChange}
        isSavedShortMoviesChecked={isSavedShortMoviesChecked}
        isSaved={true}
        onShortMoviesSavedChange={handleShortMoviesChange}
      />
      {isSearchEmpty && <p className="movies__empty">Ничего не найдено</p>}
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
