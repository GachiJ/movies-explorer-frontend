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
  const [isSavedShortMoviesChecked, setIsSavedShortMoviesChecked] = useState(false);

  /*   useEffect(() => {
      const initialFilteredMovies = filterMovies('', false);
      setFilteredMovies(initialFilteredMovies);
    }, [savedMoviesList]); */

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

  /*   useEffect(() => {
      if (location.pathname === '/saved-movies') {
        const savedSearchQuery = localStorage.getItem('searchSavedQuery');
        console.log('сохранненые фильмы', savedSearchQuery)
        const initialSearchQuery = savedSearchQuery || '';
        setSavedMoviesSearchQuery(initialSearchQuery);
  
        const savedIsShortMoviesChecked = localStorage.getItem('isSavedShortMoviesChecked');
        const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
        console.log('фильмы чекбокс', initialIsShortMoviesChecked)
        setIsSavedShortMoviesChecked(initialIsShortMoviesChecked);
  
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
      }
    }, [location, savedMoviesList]); */

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      const savedSearchQuery = localStorage.getItem('searchSavedQuery');
      const savedIsShortMoviesChecked = localStorage.getItem('isSavedShortMoviesChecked');

      const initialSearchQuery = savedSearchQuery || '';
      setSavedMoviesSearchQuery(initialSearchQuery);

      const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
      setIsSavedShortMoviesChecked(initialIsShortMoviesChecked);

      // Вызываем функцию filterMovies с аргументами из хранилища
      filterMovies(initialSearchQuery, initialIsShortMoviesChecked);
    }
  }, [location, savedMoviesList]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // При первой загрузке страницы получаем сохраненные значения из localStorage
      const savedIsSearchEmpty = localStorage.getItem('isSearchEmpty');

      // Преобразуем полученные строки в булевы значения
      const initialIsSearchEmpty = savedIsSearchEmpty === 'true';

      // Устанавливаем значения в состояния
      setIsSearchEmpty(initialIsSearchEmpty);
    }
  }, [])

  function handleSearch(savedMoviesSearchQuery, shortMovies) {
    console.log(savedMoviesSearchQuery, shortMovies)
    const filteredMovies = filterMovies(savedMoviesSearchQuery, shortMovies);
    console.log('filterMovie', filteredMovies)
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleShortMoviesChange(query, newShortMovies) {

    console.log(query, newShortMovies)
    const filteredMovies = filterMovies(query, newShortMovies);
    console.log('filterMovie', filteredMovies)
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    console.log('поиск сохраненные фильмы', newQuery)
    setSavedMoviesSearchQuery(newQuery);
    localStorage.setItem('searchSavedQuery', newQuery);
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
