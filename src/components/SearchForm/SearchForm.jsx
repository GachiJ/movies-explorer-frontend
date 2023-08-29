import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css'

export default function SearchForm({ onSearchMovies, movies }) {
  const [query, setQuery] = useState('');

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(movies, query);
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
};