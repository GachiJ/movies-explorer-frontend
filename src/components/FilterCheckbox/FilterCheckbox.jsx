/* import { useEffect, useState } from 'react'; */
import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox({ onChange, checked }) {

  const handleCheckboxChange = () => {
    onChange(!checked); // Инвертируем состояние чекбокса и передаем обратно
  };

  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        onChange={handleCheckboxChange}
        checked={checked}
      />
      <span className='filter__toggle'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
}
