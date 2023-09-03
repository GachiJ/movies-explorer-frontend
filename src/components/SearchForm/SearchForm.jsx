import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, moviesToFilter }) {
  const [query, setQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);


  useEffect(() => {
    filterMovies();
  }, [query, shortMovies]);

  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function filterMovies() {
    const filteredMovies = moviesToFilter.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= 40))
      );
    });
    onSearch(filteredMovies);

    setIsSearchEmpty(filteredMovies.length === 0);
  }


  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={(e) => e.preventDefault()}
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
          {isSearchEmpty && query && <p className="search__empty">Ничего не найдено</p>}
          <button className='search__button' type='submit'></button>
        </form>
        <FilterCheckbox onShortFilmsToggle={setShortMovies} />
      </div>
    </section>
  );
}