import { useEffect, useState } from 'react';
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

  function filterMovies(e, movies) {
    e.preventDefault();
    const filteredMovies = movies.filter((movie) => {
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

  useEffect(() => {
    if (pathname === '/movies') {
      filterMovies(movies);
    } else {
      filterMovies(savedMoviesList);
    }
  }, [pathname, query]);

  return (
    <section className='search'>
      {pathname === '/movies' ? (
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
        </div>) : (
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
      )}
    </section>
  );
};