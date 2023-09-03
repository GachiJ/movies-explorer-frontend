import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isDurationEmpty, setIsDurationEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  function filterMovies() {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!isShortMoviesChecked || (isShortMoviesChecked && movie.duration <= 40))
      );
    });
    setFilteredMovies(filteredMovies);
  }

  useEffect(() => {
    // Восстановление состояния поискового запроса
    const savedSearchQuery = localStorage.getItem('searchQuery');
    const initialSearchQuery = savedSearchQuery || '';
    setQuery(initialSearchQuery);

    // Восстановление состояния переключателя короткометражных фильмов
    const savedIsShortMoviesChecked = localStorage.getItem('isShortMoviesChecked');
    const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
    setIsShortMoviesChecked(initialIsShortMoviesChecked);

    // Фильтрация фильмов в соответствии с текущими фильтрами (поисковый запрос и короткометражные фильмы)
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = initialSearchQuery.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!initialIsShortMoviesChecked || (initialIsShortMoviesChecked && movie.duration <= 40))
      );
    });

    // Установка отфильтрованных фильмов в состояние
    setFilteredMovies(filteredMovies);
  }, [movies]);

  useEffect(() => {
    // Сохранение состояния фильтра короткометражных фильмов в localStorage
    localStorage.setItem('isShortMoviesChecked', isShortMoviesChecked);
    filterMovies();
  }, [isShortMoviesChecked]);

  function handleSearch(filteredMovies) {
    setFilteredMovies(filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    setIsDurationEmpty(
      filteredMovies.every((movie) => movie.duration > 40)
    );
  }

  function handleQueryChange(newQuery) {
    setQuery(newQuery);
    localStorage.setItem('searchQuery', newQuery);
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