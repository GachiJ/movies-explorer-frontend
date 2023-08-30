import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import '../Profile/Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Validation from '../../utils/Validation';

export default function Profile({ onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, isValid, handleChange, setValues } = Validation();
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

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
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
            />
          </div>
          <span className='profile__input-error profile__input-error_name'></span>
          <div className='profile__container-input'>
            <span className='profile__label'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='text'
              required
              value={values.email || ""}
              onChange={handleInputsChange}
            />
          </div>
          <span className='profile__input-error profile__input-error_email'></span>
        </div>
        <div className='profile__buttons-container'>
          <button
            type='submit'
            className={`profile__button-edit ${!isValid ? 'profile__button-edit_disabled' : ''}`}
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