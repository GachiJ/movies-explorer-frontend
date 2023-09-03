import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setFilteredMovies(movies); // Начальное заполнение filteredMovies всеми фильмами
  }, [movies]);

  function handleSearch(filteredMovies) {
    setFilteredMovies(filteredMovies);
  }
  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        moviesToFilter={location.pathname === '/movies' ? movies : savedMoviesList} />
      <MoviesCardList
        movies={filteredMovies.length > 0 ? filteredMovies : movies}
        savedMoviesList={filteredMovies.length > 0 ? filteredMovies : savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={false}
      />
    </main>
  );
};