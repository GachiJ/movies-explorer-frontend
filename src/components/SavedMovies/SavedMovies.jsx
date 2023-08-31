import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList); // Инициализация filteredMovies при загрузке компонента
  }, [savedMoviesList]);

  const onSearch = (filteredMovies) => {
    setFilteredMovies(filteredMovies); // Обновление filteredMovies при поиске
  };

  return (
    <main className="main">
      <SearchForm
        movies={movies}
        savedMoviesList={savedMoviesList}
        onSearch={onSearch}
      />
      <MoviesCardList
        movies={filteredMovies.length > 0 ? filteredMovies : movies}
        savedMoviesList={filteredMovies.length > 0 ? filteredMovies : savedMoviesList}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={true}
      />
    </main>
  );
};