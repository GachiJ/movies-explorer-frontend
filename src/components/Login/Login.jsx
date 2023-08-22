import '../Login/Login.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.svg'

export default function Login({ onLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLoginUser({ email, password })
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
              value={email || ''}
              onChange={handleEmailChange}
            />
            <span className='login__label'>Пароль</span>
            <input className="login__input"
              placeholder="Пароль" type="password"
              name="password"
              value={password || ''}
              onChange={handlePasswordChange}
            />
            <span className='auth__error'></span>
          </div>
          <div className="login__button-container">
            <button type="submit" className="login__button">Войти</button>
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