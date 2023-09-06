/* import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, query, onQueryChange }) {
  const [shortMovies, setShortMovies] = useState(false);


  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    onQueryChange(newQuery);
    localStorage.setItem('searchQuery', newQuery); // Используйте newQuery, а не query
  }

  function handleCheckboxChange() {
    console.log("Checkbox changed");
    setShortMovies(!shortMovies);
    // Передаем и query, и shortMovies в onSearch при изменении чекбокса
    console.log(query, !shortMovies);
    onSearch(query, !shortMovies);
    localStorage.setItem('isShortMoviesChecked', !shortMovies);
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
            onSearch(query, shortMovies)
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
        <FilterCheckbox onChange={handleCheckboxChange}
          checked={shortMovies} />
      </div>
    </section>
  );
} */
import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, query, onQueryChange }) {
  const [shortMovies, setShortMovies] = useState(false);

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    onQueryChange(newQuery);
    localStorage.setItem('searchQuery', newQuery);
  }

  function handleCheckboxChange() {
    setShortMovies(!shortMovies);
    onSearch(query, !shortMovies);
    localStorage.setItem('isShortMoviesChecked', !shortMovies);
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
