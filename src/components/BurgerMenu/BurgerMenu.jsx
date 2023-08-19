import '../BurgerMenu/BurgerMenu.css'
import { Link, Route, Routes } from "react-router-dom";
import LogoAcc from '../../images/icon__Acc.svg'
import Logo from '../../images/logo.svg'


export default function BurgerMenu({ isOpen, onClose }) {
  return (
    <section className="burger">
      <Link className="burger__logo" to='/'> <img src={Logo} alt="Логотип" className="burger__logo" /></Link>
      <div className={`burger__menu ${isOpen ? 'burger__menu_opened' : ''}`}>
        <div className='burger__navigation-container'>
          <button className="burger__button-closed"
            type="button"
            onClick={onClose}></button>
          <nav className="burger__navigation-container-link">
            <Link to='/' className="burger__navigation-link">Главная</Link>
            <Link to='/movies' className="burger__navigation-link">Фильмы</Link>
            <Link to='/saved-movies' className="burger__navigation-link">Сохраненные Фильмы</Link>
          </nav>
          <div className='burger__navigation-container-acc'>
            <Link to='/profile' className="burger__navigation-link-acc">Аккаунт <img src={LogoAcc} alt="Логотип аккаунта" className="burger__acc-logo" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};