import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, isSaved, isShortMoviesChecked, isSavedShortMoviesChecked, onShortMoviesChange, onShortMoviesSavedChange }) {
  const [query, setQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(isShortMoviesChecked);

  useEffect(() => {
    if (isSaved) {
      const savedQuerySavedMovies = localStorage.getItem('searchSavedQuery');
      if (savedQuerySavedMovies) {
        setQuery(savedQuerySavedMovies);
      }

      const savedShorSavedMovies = localStorage.getItem('isSavedShortMoviesChecked');
      if (savedShorSavedMovies) {
        setShortMovies(savedShorSavedMovies === 'true');
      }
    } else {
      const savedQuery = localStorage.getItem('searchQuery');
      if (savedQuery) {
        setQuery(savedQuery);
      }

      const savedShortMovies = localStorage.getItem('isShortMoviesChecked');
      if (savedShortMovies) {
        setShortMovies(savedShortMovies === 'true');
      }
    }
  }, []);

  useEffect(() => {
    setShortMovies(isShortMoviesChecked);
  }, [isShortMoviesChecked]);

  useEffect(() => {
    setShortMovies(isSavedShortMoviesChecked);
  }, [isSavedShortMoviesChecked]);

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (isSaved) {
      localStorage.setItem('searchSavedQuery', newQuery);
    } else {
      localStorage.setItem('searchQuery', newQuery);
    }
  }


  function handleCheckboxChange() {
    const newShortMovies = !shortMovies;
    setShortMovies(newShortMovies);
    if (isSaved) {
      localStorage.setItem('isSavedShortMoviesChecked', newShortMovies);
      if (onShortMoviesSavedChange) {
        onShortMoviesChange(query, newShortMovies);
      }
    } else {
      localStorage.setItem('isShortMoviesChecked', newShortMovies);
      if (onShortMoviesChange) {
        onShortMoviesChange(query, newShortMovies);
      }
    }


  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query, shortMovies);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={handleSubmit}
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
        <FilterCheckbox onChange={handleCheckboxChange} checked={shortMovies} />
      </div>
    </section>
  );
}
