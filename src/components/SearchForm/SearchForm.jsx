import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css';

export default function SearchForm({ onSearch, query, onQueryChange }) {
  const [shortMovies, setShortMovies] = useState(false);

/*   useEffect(() => {
    filterMovies();
  }, [query, shortMovies]); */

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    onQueryChange(newQuery);
    localStorage.setItem('searchQuery', newQuery); // Используйте newQuery, а не query
  }



 /*  function filterMovies() {
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
  } */



  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={(e) => {
            e.preventDefault();
            // Вместо вызова filterMovies() передаем данные из формы в onSearch
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
        <FilterCheckbox onShortFilmsToggle={setShortMovies} />
      </div>
    </section>
  );
}