import '../Navigation/Navigation.css'
import { Link, Route, Routes } from "react-router-dom";
import LogoAcc from '../../images/icon__Acc.svg'
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Logo from '../../images/logo.svg'


export default function Navigation({ isOpen, onClose, onMenuOpen }) {
  return (
    <section className="navigation">
      <div className='navigation__container'>
        <Link to='/'><img src={Logo} alt="Логотип" className="navigation__logo" /></Link>
        <nav className="navigation__container-link">
          <Link to='/movies' className="navigation__link">Фильмы</Link>
          <Link to='/saved-movies' className="navigation__link">Сохраненные Фильмы</Link>
          <div className='navigation__container-acc'>
            <Link to='/profile' className="navigation__link-acc">Аккаунт <img src={LogoAcc} alt="Логотип аккаунта" className="navigation__acc-logo" /></Link>
          </div>
        </nav>
      </div>
      <button className='navigation-button-opened'
      onClick={onMenuOpen}
      ></button>
      <BurgerMenu
        isOpen={isOpen}
        onClose={onClose}
      />
    </section>
  );
};