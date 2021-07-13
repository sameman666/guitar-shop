/* eslint-disable no-console */
import React, {useState, useRef, useEffect, useContext} from 'react';
import './catalog.scss';
import {GUITARS, GUITAR_TYPES, AVAILABLE_STRINGS, MAX_GUITAR_PRICE, MIN_GUITAR_PRICE, ESCAPE_KEYCODE, Prices, SortTypes, SortDirections, returnSeparatedPrice} from '../../utils/const';
import Popup from '../popup/popup';
import {ContextApp} from '../app/app';

const Catalog = () => {

  const {cart, setCart} = useContext(ContextApp);

  const initialState = {
    guitars: GUITARS,
    currentSortType: null,
    currentSortDirection: null,
    minPrice: ``,
    maxPrice: ``,
    guitarTypesToShow: {
      "акустическая гитара": false,
      "электрогитара": true,
      "укулеле": true,
    },
    amountOfStringsToShow: {
      "4": true,
      "6": true,
      "7": false,
      "12": false,
    },
    availableStringsToShow: [],
    currentPage: 1,
    addToCartPopupIsOpen: false,
    addedToCartPopupIsOpen: false,
    choosedGuitar: null,
    cart: []
  };

  const guitarStartCount = 0;
  const guitarEndCount = 9;

  const setGuitarStartCount = () => {
    if (state.currentPage === 1) {
      return guitarStartCount;
    } else {
      return (guitarStartCount + 9) * (state.currentPage - 1);
    }
  };

  const setGuitarEndCount = () => {
    if (state.currentPage === 1) {
      return guitarEndCount;
    } else {
      return guitarEndCount * state.currentPage;
    }
  };

  const [state, setState] = useState(initialState);

  const minPrice = useRef();
  const maxPrice = useRef();

  const pagesAmount = Math.ceil(state.guitars.length / 9);

  useEffect(() =>{
    setAvailableStringsToShow();
  }, [state.guitarTypesToShow]);

  const setAvailableStringsToShow = () => {
    let availableStringsToShow = [];
    for (let guitarTypeToShow in state.guitarTypesToShow) {
      if (state.guitarTypesToShow[guitarTypeToShow]) {
        let availableStringsForThisType = GUITAR_TYPES.find((guitar) => guitar.name === guitarTypeToShow).availableAmountOfStrings;
        availableStringsToShow = availableStringsToShow.concat(availableStringsForThisType);
      }
    }
    availableStringsToShow = new Set(availableStringsToShow);
    availableStringsToShow = [...availableStringsToShow];
    setState({
      ...state,
      availableStringsToShow
    });
  };

  const sortItemsHandler = (evt) => {
    let sortedItems;
    let currentSortType;
    let currentSortDirection;
    if (!state.currentSortDirection) {
      currentSortDirection = SortDirections.ASCENDING;
    } else {
      currentSortDirection = state.currentSortDirection;
    }
    switch (evt.target.textContent) {
      case SortTypes.PRICE: {
        currentSortType = SortTypes.PRICE;
        switch (currentSortDirection) {
          case SortDirections.ASCENDING: {
            sortedItems = state.guitars.sort((a, b) => a.price - b.price);
            break;
          }
          case SortDirections.DESCENDING: {
            sortedItems = state.guitars.sort((a, b) => b.price - a.price);
            break;
          }
        }
        break;
      }
      case SortTypes.POPULARITY: {
        currentSortType = SortTypes.POPULARITY;
        switch (currentSortDirection) {
          case SortDirections.ASCENDING: {
            sortedItems = state.guitars.sort((a, b) => a.reviews - b.reviews);
            break;
          }
          case SortDirections.DESCENDING: {
            sortedItems = state.guitars.sort((a, b) => b.reviews - a.reviews);
            break;
          }
        }
        break;
      }
    }
    setState({
      ...state,
      currentSortDirection,
      currentSortType,
      guitars: sortedItems,
    });
  };

  const sortItemsDirectionHandler = (evt) => {
    let sortedItems;
    let currentSortDirection;
    let currentSortType;
    if (!state.currentSortType) {
      currentSortType = SortTypes.PRICE;
    } else {
      currentSortType = state.currentSortType;
    }
    switch (evt.target.ariaLabel) {
      case SortDirections.ASCENDING: {
        currentSortDirection = SortDirections.ASCENDING;
        switch (currentSortType) {
          case SortTypes.PRICE: {
            sortedItems = state.guitars.sort((a, b) => a.price - b.price);
            break;
          }
          case SortTypes.POPULARITY: {
            sortedItems = state.guitars.sort((a, b) => a.reviews - b.reviews);
            break;
          }
        }
        break;
      }
      case SortDirections.DESCENDING: {
        currentSortDirection = SortDirections.DESCENDING;
        switch (currentSortType) {
          case SortTypes.PRICE: {
            sortedItems = state.guitars.sort((a, b) => b.price - a.price);
            break;
          }
          case SortTypes.POPULARITY: {
            sortedItems = state.guitars.sort((a, b) => b.reviews - a.reviews);
            break;
          }
        }
        break;
      }
    }
    setState({
      ...state,
      currentSortType,
      currentSortDirection,
      guitars: sortedItems
    });
  };

  const priceHandler = (evt) => {
    switch (evt.target.id) {
      case Prices.MIN_PRICE: {
        setState({
          ...state,
          minPrice: evt.target.value
        });
        break;
      }
      case Prices.MAX_PRICE: {
        setState({
          ...state,
          maxPrice: evt.target.value
        });
        break;
      }
    }
  };

  const typeHandler = (evt) => {
    setState({
      ...state,
      guitarTypesToShow: {
        ...state.guitarTypesToShow,
        [evt.target.name]: evt.target.checked
      },
    });
  };

  const stringsHandler = (evt) => {
    setState({
      ...state,
      amountOfStringsToShow: {
        ...state.amountOfStringsToShow,
        [evt.target.dataset.strings]: evt.target.checked
      },
    });
  };

  const setDisabled = (string) => {
    return state.availableStringsToShow.includes(string) ? false : true;
  };

  const submitFiltersHandler = (evt) => {
    evt.preventDefault();
    if (!maxPrice.current.value) {
      maxPrice.current.value = MAX_GUITAR_PRICE;
    }
    if (maxPrice.current.value === true || +maxPrice.current.value < +minPrice.current.value) {
      maxPrice.current.value = minPrice.current.value;
      setState({
        ...state,
        maxPrice: maxPrice.current.value
      });
    }
    let filteredGuitars = initialState.guitars;
    if (minPrice.current.value || maxPrice.current.value) {
      filteredGuitars = filteredGuitars.filter((guitar) => {
        return +guitar.price >= +minPrice.current.value && +guitar.price <= +maxPrice.current.value;
      });
    }
    let filteredGuitarsByType = [];
    for (let guitarTypeToShow in state.guitarTypesToShow) {
      if (state.guitarTypesToShow[guitarTypeToShow]) {
        filteredGuitarsByType = filteredGuitarsByType.concat(filteredGuitars.filter((guitar) => {
          return guitar.type === guitarTypeToShow;
        }));
      }
    }
    if (filteredGuitarsByType) {
      filteredGuitars = filteredGuitarsByType;
    }
    let filteredGuitarsByStrings = [];
    for (let amountOfStrings in state.amountOfStringsToShow) {
      if (state.amountOfStringsToShow[amountOfStrings]) {
        filteredGuitarsByStrings = filteredGuitarsByStrings.concat(filteredGuitars.filter((guitar) => {
          return guitar.strings === amountOfStrings;
        }));
      }
    }
    if (filteredGuitarsByStrings) {
      filteredGuitars = filteredGuitarsByStrings;
    }
    setState({
      ...state,
      guitars: filteredGuitars
    });
  };

  const paginationHandler = (evt) => {
    let currentPage = Number(evt.target.textContent);
    if (currentPage) {
      setState({
        ...state,
        currentPage
      });
    }
  };

  const swipeHandler = (evt) => {
    const direction = evt.target.textContent;
    switch (direction) {
      case `Назад`: {
        setState({
          ...state,
          currentPage: state.currentPage - 1
        });
        break;
      }
      case `Далее`: {
        setState({
          ...state,
          currentPage: state.currentPage + 1
        });
        break;
      }
    }
  };

  const addToCartPopupHandler = (evt) => {
    const choosedGuitar = state.guitars.find((guitar) => guitar.id === evt.target.dataset.id);
    setState({
      ...state,
      addToCartPopupIsOpen: !state.addToCartPopupIsOpen,
      choosedGuitar
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const closeAddToCartPopupHandler = (evt) => {
    if (evt.target.classList.contains(`cart-popup__close-button`) || evt.target.className === `cart-popup-overlay`) {
      setState({
        ...state,
        addToCartPopupIsOpen: initialState.addToCartPopupIsOpen,
        addedToCartPopupIsOpen: initialState.addedToCartPopupIsOpen
      });
      document.body.classList.remove(`popup-opened`);
    }
  };

  const keyDownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      setState({
        ...state,
        addToCartPopupIsOpen: initialState.addToCartPopupIsOpen,
        addedToCartPopupIsOpen: initialState.addedToCartPopupIsOpen
      });
      document.body.classList.toggle(`popup-opened`);
    }
  };

  const addToCartHandler = () => {
    setState({
      ...state,
      addToCartPopupIsOpen: initialState.addToCartPopupIsOpen,
      addedToCartPopupIsOpen: true
    });
    setCart([
      ...cart,
      state.choosedGuitar
    ]);
  };

  console.log(cart);
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
            <form onSubmit={submitFiltersHandler} action="https://echo.htmlacademy.ru">
              <h2>Фильтр</h2>
              <div className="main__filter">
                <h3>Цена, ₽</h3>
                <div className="main__filter-price-inputs">
                  <label htmlFor="min-price" className="visually-hidden"></label>
                  <input onChange={priceHandler} type="number" id="min-price" name="min-price" placeholder={returnSeparatedPrice(MIN_GUITAR_PRICE)} min={0} ref={minPrice}/>
                  <label htmlFor="max-price" className="visually-hidden"></label>
                  <input onChange={priceHandler} type="number" id="max-price" name="max-price" placeholder={returnSeparatedPrice(MAX_GUITAR_PRICE)} min={0} ref={maxPrice}/>
                </div>
              </div>
              <div className="main__filter main__filter--guitars">
                <h3>Тип гитар</h3>
                <ul className="main__filter-list">
                  {GUITAR_TYPES.map((guitarType) => {
                    return <li key={guitarType.id}>
                      <input onChange={typeHandler} type="checkbox" id={guitarType.id} name={guitarType.name} defaultChecked={state.guitarTypesToShow[guitarType.name]}/>
                      <label htmlFor={guitarType.id}>{guitarType.group}</label>
                    </li>;
                  })
                  }
                </ul>
              </div>
              <div className="main__filter">
                <h3>Количество струн</h3>
                <ul className="main__filter-list">
                  {AVAILABLE_STRINGS.map((string, index) => {
                    return <li key={index}>
                      <input onChange={stringsHandler} type="checkbox" id={`${string}-strings`} name={`${string}-strings`} data-strings={string} defaultChecked={state.amountOfStringsToShow[string]} disabled={setDisabled(string)}/>
                      <label htmlFor={`${string}-strings`}>{string}</label>
                    </li>;
                  })}
                </ul>
              </div>
              <button className="main__button main__button--submit" type="submit">Показать</button>
            </form>
          </aside>
          <section className="main__content-data">
            <div className="main__sorting">
              <p>Сортировать:</p>
              <button onClick={sortItemsHandler} type="button" className={`main__sorting-button ${state.currentSortType === SortTypes.PRICE ? `main__sorting-button--active` : ``}`}>по цене</button>
              <button onClick={sortItemsHandler} type="button" className={`main__sorting-button ${state.currentSortType === SortTypes.POPULARITY ? `main__sorting-button--active` : ``}`}>по популярности</button>
              <div className="main__sorting-arrows">
                <button onClick={sortItemsDirectionHandler} type="button" className={`main__sorting-arrow main__sorting-arrow--up ${state.currentSortDirection === SortDirections.ASCENDING ? `main__sorting-arrow--active` : ``}`} aria-label={SortDirections.ASCENDING}></button>
                <button onClick={sortItemsDirectionHandler} type="button" className={`main__sorting-arrow main__sorting-arrow--down ${state.currentSortDirection === SortDirections.DESCENDING ? `main__sorting-arrow--active` : ``}`} aria-label={SortDirections.DESCENDING}></button>
              </div>
            </div>
            {!state.guitars.length && <p style={{margin: `auto`}}>Нет таких гитар :(</p>}
            <ul className="main__list">
              {state.guitars.slice(setGuitarStartCount(), setGuitarEndCount()).map((guitar) =>
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
                    <button onClick={addToCartPopupHandler} data-id={guitar.id} className="main__button" type="button">Купить</button>
                  </div>
                </li>
              )}
            </ul>
            <div className="main__pagination" onClick={paginationHandler}>

              {state.currentPage !== 1 && <button onClick={swipeHandler} className="main__pagination-link main__pagination-link--text">Назад</button>}
              <button className={`main__pagination-link ${state.currentPage === 1 ? `main__pagination-link--active` : ``}`}>1
              </button>

              {(pagesAmount > 2 && state.currentPage === 1 || state.currentPage === 2 || state.currentPage === 3) && <button className={`main__pagination-link ${state.currentPage === 2 ? `main__pagination-link--active` : ``}`}>2</button>}

              {state.currentPage > 3 && <button className="main__pagination-link main__pagination-link--dots">...</button>}

              {state.currentPage > 2 && state.currentPage < pagesAmount && <button className="main__pagination-link main__pagination-link--active">{state.currentPage}</button>}

              {state.currentPage > 0 && state.currentPage < pagesAmount - 2 && <button className="main__pagination-link main__pagination-link--dots">...</button>}

              {(state.currentPage === pagesAmount || state.currentPage === pagesAmount - 2) && <button className={`main__pagination-link RRRR ${state.currentPage === pagesAmount - 1 ? `main__pagination-link--active` : ``}`}>{pagesAmount - 1}</button>}

              {pagesAmount > 1 && <button className={`main__pagination-link ${state.currentPage === pagesAmount ? `main__pagination-link--active` : ``}`}>{pagesAmount}</button>}

              <button onClick={swipeHandler} className={`main__pagination-link main__pagination-link--text ${state.currentPage === pagesAmount ? `main__pagination-link--hidden` : ``}`}>Далее</button>
            </div>
          </section>
        </div>
      </div>
      {(state.addToCartPopupIsOpen || state.addedToCartPopupIsOpen) && <Popup
        onAddToCartPopupHandler={addToCartPopupHandler}
        addToCartPopupIsOpen={state.addToCartPopupIsOpen}
        addedToCartPopupIsOpen={state.addedToCartPopupIsOpen}
        onCloseAddToCartPopupHandler={closeAddToCartPopupHandler}
        onKeyDownHandler={keyDownHandler}
        choosedGuitar={state.choosedGuitar}
        onAddToCartHandler={addToCartHandler}
      />}
    </main>
  );
};

export default Catalog;
