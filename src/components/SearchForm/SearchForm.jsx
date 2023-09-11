import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, isSaved, isShortMoviesChecked, isSavedShortMoviesChecked, onShortMoviesChange, onShortSavedMoviesChange }) {
  const [query, setQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(isShortMoviesChecked);

  useEffect(() => {
    setShortMovies(isShortMoviesChecked);
  }, [isShortMoviesChecked]);

  useEffect(() => {
    setShortMovies(isSavedShortMoviesChecked);
  }, [isSavedShortMoviesChecked]);

  useEffect(() => {
    // Проверяем, есть ли сохраненное значение запроса в localStorage
    const savedQueryMovies = localStorage.getItem('searchQuery');
    const savedQuerySavedMovies = localStorage.getItem('searchSavedQuery');
    if (savedQueryMovies) {
      setQuery(savedQueryMovies);
    } else if (savedQuerySavedMovies) {
      setQuery(savedQuerySavedMovies);
    }

    // Проверяем, есть ли сохраненное значение чекбокса в localStorage
    const savedShortMovies = localStorage.getItem('isShortMoviesChecked');
    const savedShortSavedMovies = localStorage.getItem('isSavedShortMoviesChecked');

    if (savedShortMovies) {
      setShortMovies(savedShortMovies === 'true');
    } else if (savedShortSavedMovies) {
      setShortMovies(savedShortSavedMovies === 'true');
    }
  }, []);

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
    } else {
      localStorage.setItem('isShortMoviesChecked', newShortMovies);
    }

    if (onShortMoviesChange) {
      onShortMoviesChange(query, newShortMovies);
    } else {
      onShortSavedMoviesChange(query, newShortMovies)
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
