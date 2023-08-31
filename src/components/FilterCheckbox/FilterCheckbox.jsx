import { useState } from 'react';
import '../FilterCheckbox/FilterCheckbox.css'

export default function FilterCheckbox({ onShortFilmsToggle }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onShortFilmsToggle(!isChecked); // Передаем инвертированное значение
  };


  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <span className='filter__toggle'></span>
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
};