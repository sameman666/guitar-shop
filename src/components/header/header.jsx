import React, {useContext} from 'react';
import './header.scss';
import logo from './logo.png';
import {ContextApp} from '../../utils/const';
import {Link} from 'react-router-dom';

const Header = () => {

  const {cart} = useContext(ContextApp);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to={`/`}>
          <picture>
            <img src={logo} alt="Guitar Shop" width="67" height="70"/>
          </picture>
        </Link>
        <div className="header__menu">
          <nav className="header__navigation">
            <Link to={`/`}>Каталог</Link>
            <a href="#">Где купить?</a>
            <a href="#">О компании</a>
            <a href="#">Сервис-центры</a>
          </nav>
          <div className="header__links">
            <a className="header__link header__link--location" href="#" aria-label="Навигация"></a>
            <a className="header__link header__link--search" href="#" aria-label="Поиск"></a>
            <Link to={`/cart`} className="header__link header__link--cart" aria-label="Корзина">{cart.length > 0 && <sup>{cart.length}</sup>}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
