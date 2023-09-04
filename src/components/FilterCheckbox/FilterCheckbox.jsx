import { useEffect, useState } from 'react';
import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox({ onShortFilmsToggle }) {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem('isShortMoviesChecked') === 'true'
  );

  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    onShortFilmsToggle(updatedValue);
    localStorage.setItem('isShortMoviesChecked', updatedValue);
  };

  useEffect(() => {
    const checkbox = document.querySelector('.filter__checkbox');
    checkbox.addEventListener('change', handleCheckboxChange);
    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, []);
  
 /*  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('isShortMoviesChecked');
    if (storedValue !== null) {
      setIsChecked(storedValue === 'true');
      onShortFilmsToggle(storedValue === 'true');
    }
  }, []);
  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    onShortFilmsToggle(updatedValue);
    localStorage.setItem('isShortMoviesChecked', updatedValue);
  }; */

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
}
