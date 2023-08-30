import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useState } from 'react';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  
  const onSearch = (filteredMovies) => {
    setFilteredMovies(filteredMovies);
  };

  return (
    <main className="main">
      <SearchForm
        movies={movies}
        onSearch={onSearch}
      />
      <MoviesCardList
        movies={filteredMovies.length > 0 ? filteredMovies : movies}
        /* movies={movies} */
        savedMoviesList={savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={false}
      />
    </main>
  );
};