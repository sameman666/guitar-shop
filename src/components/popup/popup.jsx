import React from 'react';
import './popup.scss';
import PropTypes from 'prop-types';
import AddedToCartPopup from "../added-to-cart-popup/added-to-cart-popup";
import AddToCartPopup from "../add-to-cart-popup/add-to-cart-popup";
// import RemoveFromCartPopup from '../remove-from-cart-popup/remove-from-cart-popup';

const Popup = (props) => {
  const {addToCartPopupIsOpen, addedToCartPopupIsOpen, onAddToCartPopupHandler, onCloseAddToCartPopupHandler, onKeyDownHandler, choosedGuitar, onAddToCartHandler} = props;

  return (
    <React.Fragment>
      {addToCartPopupIsOpen && <AddToCartPopup
        onAddToCartPopupHandler={onAddToCartPopupHandler}
        onCloseAddToCartPopupHandler={onCloseAddToCartPopupHandler}
        onKeyDownHandler={onKeyDownHandler}
        choosedGuitar={choosedGuitar}
        onAddToCartHandler={onAddToCartHandler}
      />}
      {addedToCartPopupIsOpen && <AddedToCartPopup
        onAddToCartPopupHandler={onAddToCartPopupHandler}
        onCloseAddToCartPopupHandler={onCloseAddToCartPopupHandler}
        onKeyDownHandler={onKeyDownHandler}
      />}
    </React.Fragment>
  );
};

Popup.propTypes = {
  addToCartPopupIsOpen: PropTypes.bool,
  addedToCartPopupIsOpen: PropTypes.bool,
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

export default Popup;
