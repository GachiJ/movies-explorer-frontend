import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import '../Profile/Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ handleSignOut, onUpdateUser }) {
  /*   const currentUser = useContext(CurrentUserContext); */

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      email,
    });
  }

 useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.about);
  }, [currentUser]);

  return (
    <div className="profile">
      <div className='profile__container'>
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form
          id='submit'
          className='profile__form'
          name='profile'
          onSubmit={handleSubmit}
        >
          <div className='profile__container-input'>
            <span className='profile__label'>Имя</span>
            <input
              className='profile__input'
              name='name'
              type='text'
              required
              minLength='2'
              maxLength='30'
              value={name || ""}
              onChange={handleChangeName}
            />
          </div>
          <span className='profile__input-error profile__input-error_name'></span>
          <div className='profile__container-input'>
            <span className='profile__label'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='email'
              required
              value={email || ""}
              onChange={handleChangeEmail}
            />
          </div>
          <span className='profile__input-error profile__input-error_email'></span>
        </form>
      </div>
      <div className='profile__buttons-container'>
        <button
          form='submit'
          type='submit'
          className='profile__button-edit'
        >
          Редактировать
        </button>
        <Link
          onClick={handleSignOut}
          type='button'
          className='profile__button-exit'
        >
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
};