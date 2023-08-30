import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ movies, savedMoviesList, onSearch }) {
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function filterMovies(e) {
    e.preventDefault();
    const moviesToFilter = pathname === '/movies' ? movies : savedMoviesList;
    const filteredMovies = moviesToFilter.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();

      return (
        (nameRULowerCase.includes(lowerCaseQuery) ||
          nameENLowerCase.includes(lowerCaseQuery)) &&
        (movie.duration <= 40)
      );
    });

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
        <FilterCheckbox />
      </div>
    </section>
  );
}
/* import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css'
import { useLocation } from 'react-router-dom';

export default function SearchForm({ movies, savedMoviesList }) {
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const [filteredMovies, setFilteredMovies] = useState([]);

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function filterMovies(e) {
    e.preventDefault();
    const moviesToFilter = pathname === '/movies' ? movies : savedMoviesList;
    filteredMovies = moviesToFilter.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();

      return (
        (nameRULowerCase.includes(lowerCaseQuery) ||
          nameENLowerCase.includes(lowerCaseQuery)) &&
        (movie.duration <= 40)
      );
    });

    setFilteredMovies(filteredMovies);
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
        <FilterCheckbox
        />
      </div>
    </section>
  );
}; */