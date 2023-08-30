import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useState } from 'react';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]); // Добавьте состояние для отфильтрованных фильмов

  // Функция для обновления отфильтрованных фильмов
  const handleSearch = (filteredMovies) => {
    setFilteredMovies(filteredMovies);
  };
  
  return (
    <main className="main">
      <SearchForm
        movies={movies}
        savedMoviesList={savedMoviesList}
        onSearch={handleSearch}
      />
      {/*   <Preloader /> */}
      <MoviesCardList
        movies={filteredMovies.length > 0 ? filteredMovies : movies}
        savedMoviesList={savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={false}
      />
    </main>
  );
};