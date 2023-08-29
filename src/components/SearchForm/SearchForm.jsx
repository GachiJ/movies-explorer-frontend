import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css'


export default function SearchForm({ searchrMovies }) {
  const [query, setQuery] = useState('');


  function handleChangeSearch(e) {
    setQuery(e.target.value);
  }

  function handleFilter(e) {
    e.preventDefault();
    searchrMovies()
  }

  /*   useEffect(() => {
      if (pathname === '/movies') {
        filterMovies();
      } else {
        filterMovies();
      }
    }, [pathname, query]); */


  return (
    <section className='search'>

      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={handleFilter}
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