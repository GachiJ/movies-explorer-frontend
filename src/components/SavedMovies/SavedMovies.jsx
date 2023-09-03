import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setFilteredMovies(savedMoviesList); // Начальное заполнение filteredMovies всеми фильмами
  }, [savedMoviesList]);

  function handleSearch(filteredMovies) {
    setFilteredMovies(filteredMovies);
  }

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        moviesToFilter={location.pathname === '/movies' ? movies : savedMoviesList}
      />
      <MoviesCardList
        movies={movies}
        savedMoviesList={filteredMovies}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={true}
      />
    </main>
  );
};