import '../Login/Login.css'
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Logo from '../../images/logo.svg'

export default function Login({ isLoggedIn, onRegisterUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (isLoggedIn) {
    return <Route to="/" />;
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegisterUser({ name, email, password })
  }

  return (
    <section className='auth'>
      <div className="auth__container">
        <div className='auth__header'>
          <div className="auth__header-container">
            <Link to='/' className='auth__logo-link'>
              <img src={Logo} alt='Лого' className='auth__logo' />
            </Link>
            <h1 className='auth__title'>Рады видеть!</h1>
          </div>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__input-container">
            <span className='auth__label'>Email</span>
            <input className="auth__input"
              placeholder="Email" type="email"
              name="email"
              value={email || ''}
              onChange={handleEmailChange}
            />
            <span className='auth__label'>Пароль</span>
            <input className="auth__input"
              placeholder="Пароль" type="password"
              name="password"
              value={password || ''}
              onChange={handlePasswordChange}
            />
            <span className='auth__error'></span>
          </div>
          <div className="auth__button-container">
            <button type="submit" className="auth__button">Войти</button>
            <div className="auth__signin">
              <Link to="/signup" className="auth__link">
                Ещё не зарегистрированы? <span className='auth__link-signin'>Регистрация</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};