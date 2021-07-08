import React from 'react';
import './footer.scss';
import logo from './logo_white.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__logo">
          <a href="#">
            <picture>
              <img src={logo} alt="Guitar Shop"/>
            </picture>
          </a>
          <div className="footer__social">
            <a href="#" className="footer__social-link footer__social-link--facebook" aria-label="facebook"></a>
            <a href="#" className="footer__social-link footer__social-link--instagram" aria-label="instagram"></a>
            <a href="#" className="footer__social-link footer__social-link--twitter" aria-label="twitter"></a>
          </div>
        </div>
        <div className="footer__menu">
          <div className="footer__menu-block footer__menu-block--about">
            <h2>О нас</h2>
            <p>Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге.</p>
            <p>Все инструменты проверены, отстроены и доведены до идеала! </p>
          </div>
          <div className="footer__menu-block footer__menu-block--catalog">
            <h2>Каталог</h2>
            <a href="#">Акустические гитары</a>
            <a href="#">Классические гитары</a>
            <a href="#">Электрогитары</a>
            <a href="#">Бас-гитары</a>
            <a href="#">Укулеле</a>
          </div>
          <div className="footer__menu-block footer__menu-block--info">
            <h2>Информация</h2>
            <a href="#">Где купить?</a>
            <a href="#">Блог</a>
            <a href="#">Вопрос - ответ</a>
            <a href="#">Возврат</a>
            <a href="#">Сервис-центры</a>
          </div>
          <div className="footer__menu-block footer__menu-block--contacts">
            <h2>Контакты</h2>
            <p>г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6.</p>
            <a href="tel:88125005050">8-812-500-50-50</a>
            <p>Режим работы:</p>
            <p className="footer__menu-block-hours">с 11:00 до 20:00,</p>
            <p>без выходных</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
