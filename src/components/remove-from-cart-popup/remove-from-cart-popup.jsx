import React from 'react';
import './remove-from-cart-popup.scss';
import guitar from './guitar.png';

const RemoveFromCartPopup = () => {

  return (
    <div className="cart-popup">
      <div className="cart-popup__head">
        <h3>Удалить этот товар?</h3>
        <button type="button"></button>
      </div>
      <div className="cart-popup__body">
        <img src={guitar} alt="" width="64" height="138"/>
        <div className="cart-popup__description">
          <h4>Гитара ЧЕСТЕР BASS</h4>
          <p>Артикул: SO757575</p>
          <p>Электрогитара, 6 струнная </p>
          <p>Цена: 17 500 ₽</p>
        </div>
        <div className="cart-popup__body-buttons">
          <button className="main__button" type="button">Удалить товар</button>
          <button className="main__button" type="button">Продолжить покупки</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFromCartPopup;
