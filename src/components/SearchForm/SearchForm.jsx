import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, query, onQueryChange, filterMovies }) {
  const [shortMovies, setShortMovies] = useState(false);

  useEffect(() => {
    filterMovies();
  }, [query, shortMovies]);

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    onQueryChange(newQuery);
    localStorage.setItem('searchQuery', newQuery);
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
            onSearch(filterMovies)
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
        <FilterCheckbox onShortFilmsToggle={setShortMovies} />
      </div>
    </section>
  );
}