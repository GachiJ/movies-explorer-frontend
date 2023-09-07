import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, query, onQueryChange, isShortMoviesChecked }) {
  const [shortMovies, setShortMovies] = useState(isShortMoviesChecked);

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    onQueryChange(newQuery);
    localStorage.setItem('searchQuery', newQuery);
  }

  function handleCheckboxChange() {
    const newShortMovies = !shortMovies;
    setShortMovies(newShortMovies);
    onSearch(query, newShortMovies);
    localStorage.setItem('isShortMoviesChecked', newShortMovies);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query, shortMovies);
          }}
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
