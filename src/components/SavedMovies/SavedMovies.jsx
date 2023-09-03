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


  useEffect(() => {
    setFilteredMovies(savedMoviesList); // Начальное заполнение filteredMovies всеми фильмами
  }, [savedMoviesList, query]);

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