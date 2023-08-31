import '../Login/Login.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.svg'
import Validation from '../../utils/Validation';

export default function Login({ onLoginUser }) {
  const { values, errors, isValid, handleChange } = Validation();
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
    onLoginUser({
      email: values.email,
      password: values.password,
    })
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  }

  return (
    <section className='login'>
      <div className="login__container">
        <div className='login__header'>
          <div className="login__header-container">
            <Link to='/' className='login__logo-link'>
              <img src={Logo} alt='Лого' className='login__logo' />
            </Link>
            <h1 className='login__title'>Рады видеть!</h1>
          </div>
        </div>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-container">
            <span className='login__label'>Email</span>
            <input className="login__input"
              placeholder="Email" type="email"
              name="email"
              value={values.email || ''}
              onChange={handleInputsChange}
              minLength={5} maxLength={30} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required
              disabled={disabled}
            />
            <span className='auth__error'>{errors.email}</span>
            <span className='login__label'>Пароль</span>
            <input className="login__input"
              placeholder="Пароль" type="password"
              name="password"
              minLength={8} maxLength={30} required disabled={disabled}
              value={values.password || ''}
              onChange={handleInputsChange}
            />
            <span className='auth__error'>{errors.password}</span>
            <p className={`auth__error-message ${errorMessage && 'auth__error-message_visible'}`}>{errorMessage}</p>
          </div>
          <div className="login__button-container">
            <button type="submit" className={`login__button ${!isValid && 'login__button_disabled'}`}>Войти</button>
            <div className="login__signin">
              <Link to="/signup" className="login__link">
                Ещё не зарегистрированы? <span className='login__link-signin'>Регистрация</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};