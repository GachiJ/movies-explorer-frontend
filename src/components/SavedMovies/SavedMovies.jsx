import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState('');
  /* const [query, setQuery] = useState(''); */
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  useEffect(() => {
    const initialFilteredMovies = filterMovies('', false);
    setFilteredMovies(initialFilteredMovies);
  }, [savedMoviesList]);

  function filterMovies(savedMoviesSearchQuery, shortMovies) {
    const filteredMovies = savedMoviesList.filter((movie) => {
      const lowerCaseQuery = savedMoviesSearchQuery.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= 40))
      );
    });
    setFilteredMovies(filteredMovies);
    return filteredMovies || [];
  }

  useEffect(() => {

    const savedSearchQuery = localStorage.getItem('searchSavedQuery');
    const initialSearchQuery = savedSearchQuery;
    setSavedMoviesSearchQuery(initialSearchQuery);

    const savedIsShortMoviesChecked = localStorage.getItem('isShortMoviesChecked');
    const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
    setIsShortMoviesChecked(initialIsShortMoviesChecked);

    const filteredMovies = savedMoviesList.filter((movie) => {
      const lowerCaseQuery = initialSearchQuery.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!initialIsShortMoviesChecked || (initialIsShortMoviesChecked && movie.duration <= 40))
      );
    });

    setFilteredMovies(filteredMovies);
  }, [savedMoviesList]);

/*   useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // При первой загрузке страницы получаем сохраненные значения из localStorage
      const savedIsSearchEmpty = localStorage.getItem('isSearchEmpty');

      // Преобразуем полученные строки в булевы значения
      const initialIsSearchEmpty = savedIsSearchEmpty === 'true';

      // Устанавливаем значения в состояния
      setIsSearchEmpty(initialIsSearchEmpty);
    }
  }, []) */

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchSavedQuery');
    setSavedMoviesSearchQuery(savedSearchQuery || '');
  }, []);

  function handleSearch(savedMoviesSearchQuery, shortMovies) {
    console.log(savedMoviesSearchQuery, shortMovies)
    const filteredMovies = filterMovies(savedMoviesSearchQuery, shortMovies);
    console.log('filterMovie', filteredMovies)
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    setSavedMoviesSearchQuery(newQuery);
    localStorage.setItem('searchSavedQuery', newQuery);
  }


  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        query={savedMoviesSearchQuery}
        onQueryChange={handleQueryChange}
        isShortMoviesChecked={isShortMoviesChecked}
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