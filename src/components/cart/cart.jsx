import React, {useContext, useRef, useState} from 'react';
import './cart.scss';
import {ContextApp} from '../../utils/const';
import {Link} from 'react-router-dom';
import {returnSeparatedPrice} from '../../utils/const';
import Popup from '../popup/popup';
import {ESCAPE_KEYCODE, PromoCodeDiscount} from '../../utils/const';

const Cart = () => {

  let {cart, setCart} = useContext(ContextApp);

  const initialState = {
    removePopupIsOpen: false,
    guitarToRemove: null,
    totalPrice: cart.reduce((total, item) => total + +item.price * item.amount, 0),
    promocodesApplied: {
      "GITARAHIT": false,
      "SUPERGITARA": false,
      "GITARA2020": false
    }
  };

  const [state, setState] = useState(initialState);
  const amount = useRef();
  const promoCode = useRef();

  const increaseAmountHandler = (evt) => {
    let newCart = cart.slice();
    ++newCart.find((item) => item.id === evt.target.dataset.id).amount;
    setCart(newCart);
    setState({
      ...state,
      totalPrice: newCart.reduce((total, item) => total + +item.price * item.amount, 0),
    });
  };

  const decreaseAmountHandler = (evt) => {
    let newCart = cart.slice();
    let currentGuitarAmount = newCart.find((item) => item.id === evt.target.dataset.id).amount;
    if (currentGuitarAmount > 1) {
      --newCart.find((item) => item.id === evt.target.dataset.id).amount;
      setCart(newCart);
      setState({
        ...state,
        totalPrice: newCart.reduce((total, item) => total + +item.price * item.amount, 0),
      });
    } else {
      const guitarToRemove = cart.find((guitar) => guitar.id === evt.target.dataset.id);
      setState({
        ...state,
        removePopupIsOpen: !state.removePopupIsOpen,
        guitarToRemove
      });
      document.body.classList.toggle(`popup-opened`);
    }
  };

  const removePopupHandler = (evt) => {
    const guitarToRemove = cart.find((guitar) => guitar.id === evt.target.dataset.id);
    setState({
      ...state,
      removePopupIsOpen: !state.removePopupIsOpen,
      guitarToRemove
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const closeRemovePopupHandler = (evt) => {
    if (evt.target.classList.contains(`cart-popup__close-button`) || evt.target.className === `cart-popup-overlay`) {
      setState({
        ...state,
        removePopupIsOpen: initialState.removePopupIsOpen,
      });
      document.body.classList.remove(`popup-opened`);
    }
  };

  const removePopupKeyDownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      setState({
        ...state,
        removePopupIsOpen: initialState.removePopupIsOpen,
      });
      document.body.classList.toggle(`popup-opened`);
    }
  };

  const removeItemFromCartHandler = (evt) => {
    let newCart = cart.slice();
    newCart = newCart.filter((item) => item.id !== evt.target.dataset.id);
    setCart(newCart);
    setState({
      ...state,
      removePopupIsOpen: initialState.removePopupIsOpen,
      totalPrice: newCart.reduce((total, item) => total + +item.price * item.amount, 0),
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const applyPromoCode = () => {
    if (!cart.length) {
      return;
    }
    switch (promoCode.current.value) {
      case `GITARAHIT`: {
        if (!state.promocodesApplied.GITARAHIT) {
          setState({
            ...state,
            invalidPromocode: false,
            totalPrice: state.totalPrice - state.totalPrice * PromoCodeDiscount.GITARAHIT / 100,
            promocodesApplied: {
              ...state.promocodesApplied,
              GITARAHIT: true
            }
          });
        }
        break;
      }
      case `SUPERGITARA`: {
        if (!state.promocodesApplied.SUPERGITARA) {
          setState({
            ...state,
            invalidPromocode: false,
            totalPrice: state.totalPrice - PromoCodeDiscount.SUPERGITARA,
            promocodesApplied: {
              ...state.promocodesApplied,
              SUPERGITARA: true
            }
          });
        }
        break;
      }
      case `GITARA2020`: {
        if (!state.promocodesApplied.GITARA2020) {
          let discountInRubles = state.totalPrice * PromoCodeDiscount.GITARA2020 / 100;
          discountInRubles = discountInRubles <= PromoCodeDiscount.MAX_DISCOUNT_IN_RUBLES ? discountInRubles : PromoCodeDiscount.MAX_DISCOUNT_IN_RUBLES;
          setState({
            ...state,
            invalidPromocode: false,
            totalPrice: state.totalPrice - discountInRubles,
            promocodesApplied: {
              ...state.promocodesApplied,
              GITARA2020: true
            }
          });
        }
        break;
      }
      default: {
        setState({
          ...state,
          invalidPromocode: true,
        });
      }
    }
  };

  return (
    <main className="main">
      <div className="main__wrapper main__wrapper--cart">
        <h1>Корзина</h1>
        <div className="main__crumbs">
          <Link to={`/`}>Главная</Link>
          <Link to={`/`}>Каталог</Link>
          <a>Оформляем</a>
        </div>
        <div className="main__content">
          {!cart.length && <p style={{textAlign: `center`, marginBottom: `40px`}}>В корзине пусто и одиноко</p>}
          <ul className="main__cart-list">
            {cart.map((guitar) =>
              <li key={guitar.id} className="main__cart-list-item">
                <button onClick={removePopupHandler} data-id={guitar.id} type="button"></button>
                <img src={guitar.image} alt={guitar.name} width="48" height="128"/>
                <div className="main__cart-list-item-info">
                  <p>{guitar.type} {guitar.name}</p>
                  <p>Артикул: {guitar.id}</p>
                  <p>{guitar.type}, {guitar.strings} струнная</p>
                </div>
                <p className="main__cart-list-item-price">{returnSeparatedPrice(guitar.price)} ₽</p>
                <div className="main__cart-list-item-amount">
                  <button onClick={decreaseAmountHandler} data-id={guitar.id} type="button"></button>
                  <input type="number" value={guitar.amount} readOnly={true} ref={amount}/>
                  <button onClick={increaseAmountHandler} data-id={guitar.id} type="button"></button>
                </div>
                <p className="main__cart-list-item-price main__cart-list-item-price--total">{returnSeparatedPrice(guitar.price * guitar.amount)} ₽</p>
              </li>
            )}
          </ul>
          <section className="main__purchase">
            <h2 className="visually-hidden">Оформить заказ</h2>
            <div className="main__promocode">
              <p>Промокод на скидку</p>
              <p>Введите свой промокод, если он у вас есть.</p>
              <div className="main__promocode-field">
                <input ref={promoCode} type="text" name="promocode" id="promocode" placeholder="GITARAHIT"/>
                <button onClick={applyPromoCode} className="main__button main__button--promocode" type="button">Применить купон</button>
              </div>
              {state.invalidPromocode && <p style={{color: `red`}}>Недействительный промокод</p>}
            </div>
            <div className="main__cart-price-total">
              <p>Всего: {returnSeparatedPrice(state.totalPrice)} ₽</p>
              <button className="main__button main__button--confirm" type="button">Оформить заказ</button>
            </div>
          </section>
        </div>
      </div>
      {state.removePopupIsOpen && <Popup
        removePopupIsOpen={state.removePopupIsOpen}
        onRemovePopupHandler={removePopupHandler}
        onCloseRemovePopupHandler={closeRemovePopupHandler}
        onRemovePopupKeyDownHandler={removePopupKeyDownHandler}
        onRemoveItemFromCartHandler={removeItemFromCartHandler}
        guitarToRemove={state.guitarToRemove}
      />}
    </main>
  );
};

export default Cart;
