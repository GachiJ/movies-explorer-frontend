import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete, isLoader }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  /*  useEffect(() => {
     const initialFilteredMovies = filterMovies('', false);
     setFilteredMovies(initialFilteredMovies);
   }, [movies]); */

  function filterMovies(query, shortMovies) {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
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
    if (location.pathname === '/movies') {
      const savedSearchQuery = localStorage.getItem('searchQuery');
      const savedIsShortMoviesChecked = localStorage.getItem('isShortMoviesChecked');
      
      const initialSearchQuery = savedSearchQuery || '';
      setQuery(initialSearchQuery);
      
      const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
      setIsShortMoviesChecked(initialIsShortMoviesChecked);
      
      // Вызываем функцию filterMovies с аргументами из хранилища
      filterMovies(initialSearchQuery, initialIsShortMoviesChecked);
    }
  }, [location, movies]);

/*   useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // При первой загрузке страницы получаем сохраненные значения из localStorage
      const savedIsSearchEmpty = localStorage.getItem('isSearchEmpty');

      // Преобразуем полученные строки в булевы значения
      const initialIsSearchEmpty = savedIsSearchEmpty === 'true';

      // Устанавливаем значения в состояния
      setIsSearchEmpty(initialIsSearchEmpty);
    }
  }, []); */

  function handleSearch(query, shortMovies) {
    console.log(query, shortMovies)
    const filteredMovies = filterMovies(query, shortMovies);
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
    console.log('поиск фильмы', newQuery)
    setQuery(newQuery);
    localStorage.setItem('searchQuery', newQuery);
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