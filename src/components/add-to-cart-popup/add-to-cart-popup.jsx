import React from 'react';
import {returnSeparatedPrice} from '../../utils/const';
import PropTypes from 'prop-types';

const AddToCartPopup = (props) => {
  const {onAddToCartPopupHandler, onCloseAddToCartPopupHandler, onKeyDownHandler, choosedGuitar, onAddToCartHandler} = props;

  return (
    <div onKeyDown={onKeyDownHandler} onClick={onCloseAddToCartPopupHandler} tabIndex={1} className="cart-popup-overlay">
      <div className="cart-popup">
        <div className="cart-popup__head">
          <h3>Добавить товар в корзину</h3>
          <button className="cart-popup__close-button" onClick={onAddToCartPopupHandler} type="button"></button>
        </div>
        <div className="cart-popup__body">
          <img src={choosedGuitar.image} alt={choosedGuitar.name} width="56" height="138"/>
          <div className="cart-popup__description">
            <h4>Гитара {choosedGuitar.name}</h4>
            <p>Артикул: {choosedGuitar.id}</p>
            <p>{choosedGuitar.type}, {choosedGuitar.strings} струнная </p>
            <p>Цена: {returnSeparatedPrice(choosedGuitar.price)} ₽</p>
          </div>
          <button onClick={onAddToCartHandler} className="main__button" type="button" autoFocus={true}>Добавить в корзину</button>
        </div>
      </div>
    </div>
  );
};

AddToCartPopup.propTypes = {
  addToCartPopupIsOpen: PropTypes.bool,
  onAddToCartPopupHandler: PropTypes.func,
  onCloseAddToCartPopupHandler: PropTypes.func,
  onKeyDownHandler: PropTypes.func,
  onAddToCartHandler: PropTypes.func,
  choosedGuitar: PropTypes.shape({
    number: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    reviews: PropTypes.string,
    strings: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string
  })
};

export default AddToCartPopup;
