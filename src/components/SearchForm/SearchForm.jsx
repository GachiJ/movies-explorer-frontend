import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css'

export default function SearchForm({ movies, savedMoviesList, onSearch }) {
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const [shortMovies, setShortMovies] = useState(false);

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function filterMovies(e) {
    e.preventDefault();
    console.log(savedMoviesList)
    const moviesToFilter = pathname === '/movies' ? movies : savedMoviesList;
    const filteredMovies = moviesToFilter.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      console.log(movie, nameRULowerCase, nameENLowerCase)
      return (
        ((nameRULowerCase.includes(lowerCaseQuery) ||
          nameENLowerCase.includes(lowerCaseQuery))) || (shortMovies && movie.duration <= 40)
      );
    });
    console.log(filteredMovies);
    onSearch(filteredMovies);

  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={filterMovies}
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
          <button
            className='search__button'
            type='submit'
          ></button>
        </form>
        <FilterCheckbox handleShortFilms={() => setShortMovies(!shortMovies)} // Инвертируем состояние короткометражных фильмов
          shortMovies={shortMovies} />
      </div>
    </section>
  );
}