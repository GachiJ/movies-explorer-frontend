import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import '../SearchForm/SearchForm.css'

export default function SearchForm() {
  return(
    <section className='search'>
    <div className='search__container'>
      <form
        noValidate
        className='search__form'
        name='search'
      >
        <input
          className='search__input'
          name='search'
          type='text'
          placeholder='Фильм'
          autoComplete='off'
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