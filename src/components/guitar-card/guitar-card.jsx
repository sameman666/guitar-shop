import React from 'react';
import './guitar-card.scss';
import {returnSeparatedPrice} from '../../utils/const';
import PropTypes from 'prop-types';

const GuitarCard = ({guitar, onAddToCartPopupHandler}) => {

  return (
    <li key={guitar.id} className="main__list-item">
      <img src={guitar.image} alt="Гитара" height="197"/>
      <div className="main__list-item-rating">
        <ul className="main__list-item-stars">
          <li className="main__list-item-star main__list-item-star--full"></li>
          <li className="main__list-item-star main__list-item-star--full"></li>
          <li className="main__list-item-star main__list-item-star--full"></li>
          <li className="main__list-item-star main__list-item-star--half"></li>
          <li className="main__list-item-star"></li>
        </ul>
        <span>{guitar.reviews}</span>
      </div>
      <div className="main__list-item-decription">
        <h4>{guitar.name}</h4>
        <p>{returnSeparatedPrice(guitar.price)} ₽</p>
      </div>
      <div className="main-list-item-buttons">
        <a href="#" className="main__button">Подробнее</a>
        <button onClick={onAddToCartPopupHandler} data-id={guitar.id} className="main__button" type="button">Купить</button>
      </div>
    </li>
  );
};

GuitarCard.propTypes = {
  guitar: PropTypes.shape({
    number: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    reviews: PropTypes.string,
    strings: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string
  }),
  onAddToCartPopupHandler: PropTypes.func
};

export default GuitarCard;
