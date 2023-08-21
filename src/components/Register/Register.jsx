import '../Register/Register.css'
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Logo from '../../images/logo.svg'

export default function Register({ isLoggedIn, onRegisterUser }) {
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
            <h1 className='auth__title'>Добро пожаловать!</h1>
          </div>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__input-container">
            <span className='auth__label'>Имя</span>
            <input className="auth__input"
              placeholder="Имя" type="text"
              name="name"
              value={name || ''}
              onChange={handleNameChange}
            />
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
            <button type="submit" className="auth__button">Зарегистрироваться</button>
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

/*   return (
     <section className='auth'>
      <div className='auth__header'>
        <div className="auth__header-container">
        <Link to='/' className='auth__logo-link'>
          <img src={Logo} alt='Лого' className='auth__logo' />
        </Link>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        </div>
      </div>
      <div className="auth__container">
        <form className="auth__form" onSubmit={handleSubmit}>
          <span className='auth__label'>Имя</span>
          <input className="auth__input"
            placeholder="Имя" type="text"
            name="name"
            value={name || ''}
            onChange={handleNameChange}
          />
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
          <button type="submit" className="auth__button">Зарегистрироваться</button>
          <div className="auth__signin">
            <Link to="/signin" className="auth__link">
              Уже зарегистрированы? <span className='auth__link-signin'>Войти</span>
            </Link>
          </div>
        </form>
      </div>
      </section> 
  );
}; */