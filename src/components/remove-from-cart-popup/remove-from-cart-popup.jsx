import React from 'react';
import './remove-from-cart-popup.scss';
import {returnSeparatedPrice} from '../../utils/const';
import PropTypes from 'prop-types';

const RemoveFromCartPopup = (props) => {

  const {onCloseRemovePopupHandler, onRemovePopupHandler, onRemovePopupKeyDownHandler, guitarToRemove, onRemoveItemFromCartHandler} = props;

  return (
    <div onKeyDown={onRemovePopupKeyDownHandler} onClick={onCloseRemovePopupHandler} tabIndex={1} className="cart-popup-overlay">
      <div className="cart-popup">
        <div className="cart-popup__head">
          <h3>Удалить этот товар?</h3>
          <button onClick={onRemovePopupHandler} className="cart-popup__close-button" type="button"></button>
        </div>
        <div className="cart-popup__body">
          <img src={guitarToRemove.image} alt={guitarToRemove.name} width="56" height="138"/>
          <div className="cart-popup__description">
            <h4>Гитара {guitarToRemove.name}</h4>
            <p>Артикул: {guitarToRemove.id}</p>
            <p>{guitarToRemove.type}, {guitarToRemove.strings} струнная </p>
            <p>Цена: {returnSeparatedPrice(guitarToRemove.price)} ₽</p>
          </div>
          <div className="cart-popup__body-buttons">
            <button onClick={onRemoveItemFromCartHandler} data-id={guitarToRemove.id} className="main__button" type="button" autoFocus={true}>Удалить товар</button>
            <button onClick={onRemovePopupHandler} className="main__button" type="button">Продолжить покупки</button>
          </div>
        </div>
      </div>
    </div>
  );
};

RemoveFromCartPopup.propTypes = {
  onCloseRemovePopupHandler: PropTypes.func,
  onRemovePopupHandler: PropTypes.func,
  onRemovePopupKeyDownHandler: PropTypes.func,
  onRemoveItemFromCartHandler: PropTypes.func,
  guitarToRemove: PropTypes.shape({
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

export default RemoveFromCartPopup;
