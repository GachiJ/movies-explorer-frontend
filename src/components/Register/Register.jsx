import '../Register/Register.css'
import { Link, Route } from "react-router-dom";
import Logo from '../../images/logo.svg'
/* import Validation from '../../utils/Validation'; */
import useFormWithValidation from '../../utils/Validation';
import { useState } from 'react';

export default function Register({ isLoggedIn, onRegisterUser }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage,] = useState('');

  /*   const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); */

  if (isLoggedIn) {
    return <Route to="/" />;
  }

  function handleInputsChange(evt) {
    handleChange(evt);
    cleanErrorMessage();
  }

  function cleanErrorMessage() {
    setErrorMessage('');
  }


  /*   function handleNameChange(e) {
      setName(e.target.value)
    }
  
    function handleEmailChange(e) {
      setEmail(e.target.value)
    }
  
    function handlePasswordChange(e) {
      setPassword(e.target.value)
    } */

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
              minLength={5} maxLength={30} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required
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