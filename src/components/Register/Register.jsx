import '../Register/Register.css'
import { Link } from "react-router-dom";
import Logo from '../../images/logo.svg'
import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import useValidation from '../../utils/useValidation';

export default function Register({ onRegisterUser, isLoader }) {
  const { values, errors, isValid, handleChange } = useValidation();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage,] = useState('');


  function handleInputsChange(evt) {
    handleChange(evt);
    cleanErrorMessage();
  }

  function cleanErrorMessage() {
    setErrorMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegisterUser({
      name: values.name,
      email: values.email,
      password: values.password,
    })
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  }

  return (
    <section className='auth'>
      <Preloader isLoader={isLoader} />
      <div className="auth__container">
        <div className='auth__header'>
          <div className="auth__header-container">
            <Link to='/' className='auth__logo-link'>
              <img src={Logo} alt='Лого' className='auth__logo' />
            </Link>
            <h1 className='auth__title'>Добро пожаловать!</h1>
          </div>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__input-container">
            <span className='auth__label'>Имя</span>
            <input className="auth__input"
              placeholder="Имя" type="text"
              name="name"
              value={values.name || ''}
              onChange={handleInputsChange}
              minLength={2} maxLength={30} pattern='[A-Za-zА-Яа-яЁё\s-]+' required disabled={disabled}
            />
            <span className='auth__error'>{errors.name}</span>
            <span className='auth__label'>Email</span>
            <input className="auth__input"
              placeholder="Email" type="email"
              name="email"
              value={values.email || ''}
              onChange={handleInputsChange}
              minLength={5} maxLength={30} pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" required
              disabled={disabled}
            />
            <span className='auth__error'>{errors.email}</span>
            <span className='auth__label'>Пароль</span>
            <input className="auth__input"
              placeholder="Пароль" type="password"
              minLength={8} maxLength={30} required disabled={disabled}
              name="password"
              value={values.password || ''}
              onChange={handleInputsChange}
            />
            <span className='auth__error'>{errors.password}</span>
            <p className={`auth__error-message ${errorMessage && 'auth__error-message_visible'}`}>{errorMessage}</p>
          </div>
          <div className="auth__button-container">
            <button type="submit" className={`auth__button ${!isValid && 'auth__button_disabled'}`}>Зарегистрироваться</button>
            <div className="auth__signin">
              <Link to="/signin" className="auth__link">
                Уже зарегистрированы? <span className='auth__link-signin'>Войти</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};