import React from 'react';
import './added-to-cart-popup.scss';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const AddedToCartPopup = (props) => {

  const {onKeyDownHandler, onCloseAddToCartPopupHandler, onAddToCartPopupHandler} = props;

  return (
    <div onKeyDown={onKeyDownHandler} onClick={onCloseAddToCartPopupHandler} tabIndex={1} className="cart-popup-overlay">
      <div className="cart-popup cart-popup--added">
        <div className="cart-popup__head">
          <h3 className="cart-popup__head-title">Товар успешно добавлен в корзину</h3>
          <button className="cart-popup__close-button" onClick={onAddToCartPopupHandler} type="button"></button>
        </div>
        <div className="cart-popup__body">
          <Link to={`/cart`} onClick={onAddToCartPopupHandler} className="main__button" type="button" autoFocus={true}>Перейти в корзину</Link>
          <button className="main__button cart-popup__close-button" type="button">Продолжить покупки</button>
        </div>
      </div>
    </div>
  );
};

AddedToCartPopup.propTypes = {
  onAddToCartPopupHandler: PropTypes.func,
  onCloseAddToCartPopupHandler: PropTypes.func,
  onKeyDownHandler: PropTypes.func,
};

export default AddedToCartPopup;
