import React from 'react';
import './main.scss';
import {GUITARS} from '../../utils/const';

const Main = () => {

  return (
    <main className="main">
      <div className="main__wrapper">
        <h1>Каталог гитар</h1>
        <div className="main__crumbs">
          <a href="#">Главная</a>
          <a href="#">Каталог</a>
        </div>
        <div className="main__content">
          <aside>
            <form action="https://echo.htmlacademy.ru">
              <h2>Фильтр</h2>
              <div className="main__filter">
                <h3>Цена, ₽</h3>
                <div className="main__filter-price-inputs">
                  <label htmlFor="min-price" className="visually-hidden"></label>
                  <input type="number" id="min-price" name="min-price" placeholder="1 000"/>
                  <label htmlFor="max-price" className="visually-hidden"></label>
                  <input type="number" id="max-price" name="max-price" placeholder="30 000"/>
                </div>
              </div>
              <div className="main__filter main__filter--guitars">
                <h3>Тип гитар</h3>
                <ul className="main__filter-list">
                  <li>
                    <input type="checkbox" id="acoustic-guitars" name="acoustic-guitars" className="visually-hidden"/>
                    <label htmlFor="acoustic-guitars">Акустические гитары</label>
                  </li>
                  <li>
                    <input type="checkbox" id="electric-guitars" name="electric-guitars" defaultChecked={true} className="visually-hidden"/>
                    <label htmlFor="electric-guitars">Электрогитары</label>
                  </li>
                  <li>
                    <input type="checkbox" id="ukulele" name="ukulele" defaultChecked={true} className="visually-hidden"/>
                    <label htmlFor="ukulele">Укулеле</label>
                  </li>
                </ul>
              </div>
              <div className="main__filter">
                <h3>Количество струн</h3>
                <ul className="main__filter-list">
                  <li>
                    <input type="checkbox" id="4-strings" name="4-strings" defaultChecked={true} className="visually-hidden"/>
                    <label htmlFor="4-strings">4</label>
                  </li>
                  <li>
                    <input type="checkbox" id="6-strings" name="6-strings" defaultChecked={true} className="visually-hidden"/>
                    <label htmlFor="6-strings">6</label>
                  </li>
                  <li>
                    <input type="checkbox" id="7-strings" name="7-strings" className="visually-hidden"/>
                    <label htmlFor="7-strings">7</label>
                  </li>
                  <li>
                    <input type="checkbox" id="12-strings" name="12-strings" disabled={true} className="visually-hidden"/>
                    <label htmlFor="12-strings">12</label>
                  </li>
                </ul>
              </div>
              <button className="main__button main__button--submit" type="submit">Показать</button>
            </form>
          </aside>
          <section className="main__content-data">
            <div className="main__sorting">
              <p>Сортировать:</p>
              <button type="button" className="main__sorting-button main__sorting-button--active">по цене</button>
              <button type="button" className="main__sorting-button">по популярности</button>
              <div className="main__sorting-arrows">
                <button type="button" className="main__sorting-arrow main__sorting-arrow--up main__sorting-arrow--active"></button>
                <button type="button" className="main__sorting-arrow main__sorting-arrow--down"></button>
              </div>
            </div>
            <ul className="main__list">
              {GUITARS.slice(0, 9).map((guitar) =>
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
                    <p>{guitar.price} ₽</p>
                  </div>
                  <div className="main-list-item-buttons">
                    <a href="#" className="main__button">Подробнее</a>
                    <button className="main__button" type="button">Купить</button>
                  </div>
                </li>
              )}
            </ul>
            <div className="main__pagination">
              <a className="main__pagination-link main__pagination-link--active" href="#">1</a>
              <a className="main__pagination-link" href="#">2</a>
              <a className="main__pagination-link" href="#">...</a>
              <a className="main__pagination-link" href="#">7</a>
              <a className="main__pagination-link" href="#">Далее</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Main;
