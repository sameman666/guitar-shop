/* eslint-disable no-console */
import React, {useContext} from 'react';
import './cart.scss';
import {GUITARS} from '../../utils/const';
import {ContextApp} from '../app/app';

const Cart = () => {

  const {cart} = useContext(ContextApp);
  console.log(cart);
  return (
    <main className="main">
      <div className="main__wrapper main__wrapper--cart">
        <h1>Корзина</h1>
        <div className="main__crumbs">
          <a href="/">Главная</a>
          <a href="/">Каталог</a>
          <a>Оформляем</a>
        </div>
        <div className="main__content">
          <ul className="main__cart-list">
            {GUITARS.slice(0, 2).map((guitar) =>
              <li key={guitar.id} className="main__cart-list-item">
                <button type="button"></button>
                <img src={guitar.image} alt="" width="48" height="128"/>
                <div className="main__cart-list-item-info">
                  <h4>{guitar.type} {guitar.name}</h4>
                  <p>Артикул: {guitar.id}</p>
                  <p>{guitar.type}, {guitar.strings} струнная</p>
                </div>
                <p className="main__cart-list-item-price">{guitar.price} ₽</p>
                <div className="main__cart-list-item-amount">
                  <button type="button"></button>
                  <input type="number" placeholder="1"/>
                  <button type="button"></button>
                </div>
                <p className="main__cart-list-item-price main__cart-list-item-price--total">{guitar.price} ₽</p>
              </li>
            )}
          </ul>
          <section className="main__purchase">
            <div className="main__promocode">
              <h5>Промокод на скидку</h5>
              <p>Введите свой промокод, если он у вас есть.</p>
              <div className="main__promocode-field">
                <input type="text" name="promocode" id="promocode" placeholder="GITARAHIT"/>
                <button className="main__button main__button--promocode" type="button">Применить купон</button>
              </div>
            </div>
            <div className="main__cart-price-total">
              <p>Всего: 47 000 ₽</p>
              <button className="main__button main__button--confirm" type="button">Оформить заказ</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Cart;
