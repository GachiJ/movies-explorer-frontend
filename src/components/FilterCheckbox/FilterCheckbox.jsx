import '../FilterCheckbox/FilterCheckbox.css'

export default function FilterCheckbox({ handleShortFilms, shortMovies }) {
  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        onChange={handleShortFilms}
        checked={shortMovies}
      />
      <span className='filter__toggle'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
};