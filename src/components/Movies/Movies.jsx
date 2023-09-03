import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isDurationEmpty, setIsDurationEmpty] = useState(false);
  const [query, setQuery] = useState('');


  useEffect(() => {
    setFilteredMovies(movies); // Начальное заполнение filteredMovies всеми фильмами
  }, [movies, query]);

  function handleSearch(filteredMovies) {
    setFilteredMovies(filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    setIsDurationEmpty(
      filteredMovies.every((movie) => movie.duration > 40)
    );
  }

  function handleQueryChange(newQuery) { // Функция для обновления query
    setQuery(newQuery);
  }

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        moviesToFilter={location.pathname === '/movies' ? movies : savedMoviesList}
        query={query} // Передаем query в SearchForm
        onQueryChange={handleQueryChange}
      />
      {(isSearchEmpty || isDurationEmpty) && (
        <p className="movies__empty">Ничего не найдено</p>
      )}
      {!isSearchEmpty && !isDurationEmpty && (
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