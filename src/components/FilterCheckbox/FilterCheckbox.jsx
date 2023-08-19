import '../FilterCheckbox/FilterCheckbox.css'

export default function FilterCheckbox() {
  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
      /*   onChange={onFilterCheckbox}
        checked={isShortMovies ? true : false} */
      />
      <span className='filter__toggle'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
};