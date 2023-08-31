import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ movies, savedMoviesList, onSearch }) {
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    filterMovies(); // Вызываем функцию фильтрации при изменении shortMovies
  }, [shortMovies]);

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function filterMovies() {
    const moviesToFilter = pathname === '/movies' ? movies : savedMoviesList;
    const filteredMovies = moviesToFilter.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= 40)) // Добавляем условие для короткометражных фильмов
      );
    });
    setFilteredMovies(filteredMovies);
    onSearch(filteredMovies);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={(e) => e.preventDefault()} // Убираем действие по умолчанию отправки формы
        >
          <input
            className='search__input'
            name='search'
            type='text'
            placeholder='Фильм'
            autoComplete='off'
            onChange={handleChangeSearch}
            value={query || ''}
            required
          />
          <button className='search__button' type='submit'></button>
        </form>
        <FilterCheckbox onShortFilmsToggle={setShortMovies} /> {/* Передаем функцию для изменения состояния короткометражных фильмов */}
      </div>
    </section>
  );
}