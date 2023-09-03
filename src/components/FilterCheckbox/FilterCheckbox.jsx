import { useEffect, useState } from 'react';
import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox({ onShortFilmsToggle }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('isShortMoviesChecked');
    if (storedValue !== null) {
      setIsChecked(storedValue === 'true');
    }
  }, []);

  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    onShortFilmsToggle(updatedValue);
    localStorage.setItem('isShortMoviesChecked', updatedValue);
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
}
