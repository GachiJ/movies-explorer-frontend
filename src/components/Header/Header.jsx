import '../Header/Header.css'
import { Link, Route, Routes } from "react-router-dom";
import Logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';


export default function Header({ isLoggedIn, isOpen, onClose, onMenuOpen }) {

  return (
    <Routes>
      <Route path='/' element={isLoggedIn ? (
        <header className="header">
          <div className="header__container">
            <Navigation
              isOpen={isOpen}
              onClose={onClose}
              onMenuOpen={onMenuOpen}
            />
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="header__container">
            <Link to='/'> <img src={Logo} alt="Логотип" className="header__logo" /></Link>
            <nav className="header__link-container">
              <Link to='/signup' href="" className="header__link-sign-up"> Регистрация</Link>
              <Link to='/signin' className="header__link-sign-in"> Войти</Link>
            </nav>
          </div>
        </header>)
      } />

      <Route path='/movies' element={
        <header className="header">
          <div className="header__container">
            <Navigation
              isOpen={isOpen}
              onClose={onClose}
              onMenuOpen={onMenuOpen}
            />
          </div>
        </header>
      } />

      <Route path='/saved-movies' element={
        <header className="header">
          <div className="header__container">
            <Navigation
              isOpen={isOpen}
              onMenuOpen={onMenuOpen}
              onClose={onClose}
            />
          </div>
        </header>
      } />

      <Route path='/profile' element={
        <header className="header">
          <div className="header__container">
            <Navigation
              isOpen={isOpen}
              onMenuOpen={onMenuOpen}
              onClose={onClose}
            />
          </div>
        </header>
      } />
    </Routes >
  );
};