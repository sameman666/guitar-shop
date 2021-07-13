import React, {useContext} from 'react';
import './header.scss';
import logo from './logo.png';
import {ContextApp} from '../app/app';
import {Link} from 'react-router-dom';

const Header = () => {

  const {cart} = useContext(ContextApp);

  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="#">
          <picture>
            <img src={logo} alt="Guitar Shop"/>
          </picture>
        </a>
        <div className="header__menu">
          <nav className="header__navigation">
            <a href="#">Каталог</a>
            <a href="#">Где купить?</a>
            <a href="#">О компании</a>
            <a href="#">Сервис-центры</a>
          </nav>
          <div className="header__links">
            <a className="header__link header__link--location" href="#"></a>
            <a className="header__link header__link--search" href="#"></a>
            <Link to={`/cart`} className="header__link header__link--cart">{cart.length > 0 && <sup>{cart.length}</sup>}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
