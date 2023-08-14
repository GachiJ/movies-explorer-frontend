import { Link } from 'react-router-dom';
import '../Profile/Profile.css'
/* import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext' */

export default function Profile() {
  /*   const currentUser = useContext(CurrentUserContext); */
  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form
        id='submit'
        className='profile__form'
        name='profile'
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
            />
          </div>
          <span className='profile__input-error profile__input-error_email'></span>
        </div>
      </form>
      <div className='profile__buttons-container'>
        <button
          form='submit'
          type='submit'
          className='profile__button-edit'
        >
          Редактировать
        </button>
        <Link to={'/'}
          type='button'
          className='profile__button-exit'
        >
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
};