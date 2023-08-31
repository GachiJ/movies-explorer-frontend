import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import '../Profile/Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Validation from '../../utils/useValidation';

export default function Profile({ onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange, setValues } = Validation();
  const [disabled, setDisabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(values.name !== currentUser.name || values.email !== currentUser.email);
  }, [values, currentUser]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);


  function handleInputsChange(evt) {
    handleChange(evt);
  }


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      email: values.email,
    });

    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  }

  const isRequiredСondition =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <form
        id='submit'
        className='profile__form'
        name='profile'
        onSubmit={handleSubmit}
      >
        <div className='profile__container'>
          <div className='profile__container-input'>
            <span className='profile__label'>Имя</span>
            <input
              className='profile__input'
              name='name'
              type='text'
              required
              minLength='2'
              maxLength='30'
              value={values.name || ""}
              onChange={handleInputsChange}
              disabled={disabled}
            />
          </div>
          <span className='profile__input-error profile__input-error_name'>{errors.name}</span>
          <div className='profile__container-input'>
            <span className='profile__label'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='text'
              required
              value={values.email || ""}
              onChange={handleInputsChange}
              disabled={disabled}
            />
          </div>
          <span className='profile__input-error profile__input-error_email'>{errors.email}</span>
        </div>
        <div className='profile__buttons-container'>
          <button
            type='submit'
            disabled={isRequiredСondition}
            className='profile__button-edit'
          >
            Редактировать
          </button>
          <Link
            to="/"
            onClick={onSignOut}
            className='profile__button-exit'
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </div>
  );
};