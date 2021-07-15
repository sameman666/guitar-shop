/* eslint-disable no-console */
import React, {useState, useRef, useEffect, useContext} from 'react';
import './catalog.scss';
import {GUITARS, GUITAR_TYPES, AVAILABLE_STRINGS, MAX_GUITAR_PRICE, MIN_GUITAR_PRICE, ESCAPE_KEYCODE, GUITAR_START_COUNT, GUITAR_END_COUNT, MAX_ITEMS_PER_PAGE, Prices, SortTypes, SortDirections, returnSeparatedPrice, PageDirections} from '../../utils/const';
import Popup from '../popup/popup';
import GuitarCard from '../guitar-card/guitar-card';
import {ContextApp} from '../../utils/const';
import {Link} from 'react-router-dom';

const Catalog = () => {

  const {cart, setCart} = useContext(ContextApp);

  GUITARS.forEach((item) => {
    item.amount = 1;
  });

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

  const setGuitarStartCount = () => {
    return state.currentPage === 1 ? GUITAR_START_COUNT : (GUITAR_START_COUNT + MAX_ITEMS_PER_PAGE) * (state.currentPage - 1);
  };

  const setGuitarEndCount = () => {
    return state.currentPage === 1 ? GUITAR_END_COUNT : GUITAR_END_COUNT * state.currentPage;
  };

  const [state, setState] = useState(initialState);
  const minPrice = useRef();
  const maxPrice = useRef();

  let pagesAmount = Math.ceil(state.guitars.length / MAX_ITEMS_PER_PAGE);

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
    let sortedGuitars;
    let currentSortType;
    let currentSortDirection = !state.currentSortDirection ? SortDirections.ASCENDING : state.currentSortDirection;
    switch (evt.target.textContent) {
      case SortTypes.PRICE: {
        currentSortType = SortTypes.PRICE;
        switch (currentSortDirection) {
          case SortDirections.ASCENDING: {
            sortedGuitars = state.guitars.sort((a, b) => a.price - b.price);
            break;
          }
          case SortDirections.DESCENDING: {
            sortedGuitars = state.guitars.sort((a, b) => b.price - a.price);
            break;
          }
        }
        break;
      }
      case SortTypes.POPULARITY: {
        currentSortType = SortTypes.POPULARITY;
        switch (currentSortDirection) {
          case SortDirections.ASCENDING: {
            sortedGuitars = state.guitars.sort((a, b) => a.reviews - b.reviews);
            break;
          }
          case SortDirections.DESCENDING: {
            sortedGuitars = state.guitars.sort((a, b) => b.reviews - a.reviews);
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
      guitars: sortedGuitars,
    });
  };

  const sortItemsDirectionHandler = (evt) => {
    let sortedGuitars;
    let currentSortDirection;
    let currentSortType = !state.currentSortType ? SortTypes.PRICE : state.currentSortType;
    switch (evt.target.dataset.direction) {
      case SortDirections.ASCENDING: {
        currentSortDirection = SortDirections.ASCENDING;
        switch (currentSortType) {
          case SortTypes.PRICE: {
            sortedGuitars = state.guitars.sort((a, b) => a.price - b.price);
            break;
          }
          case SortTypes.POPULARITY: {
            sortedGuitars = state.guitars.sort((a, b) => a.reviews - b.reviews);
            break;
          }
        }
        break;
      }
      case SortDirections.DESCENDING: {
        currentSortDirection = SortDirections.DESCENDING;
        switch (currentSortType) {
          case SortTypes.PRICE: {
            sortedGuitars = state.guitars.sort((a, b) => b.price - a.price);
            break;
          }
          case SortTypes.POPULARITY: {
            sortedGuitars = state.guitars.sort((a, b) => b.reviews - a.reviews);
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
      guitars: sortedGuitars
    });
  };

  const priceHandler = (evt) => {
    return evt.target.id === Prices.MIN_PRICE ?
      setState({
        ...state,
        minPrice: evt.target.value
      }) :
      setState({
        ...state,
        maxPrice: evt.target.value
      });
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
    maxPrice.current.value = !maxPrice.current.value && minPrice.current.value ? MAX_GUITAR_PRICE : maxPrice.current.value;
    if (maxPrice.current.value === true || +maxPrice.current.value < +minPrice.current.value) {
      maxPrice.current.value = minPrice.current.value;
      setState({
        ...state,
        maxPrice: maxPrice.current.value
      });
    }
    let filteredGuitars = initialState.guitars;
    filteredGuitars = minPrice.current.value || maxPrice.current.value ? filteredGuitars.filter((guitar) => {
      return +guitar.price >= +minPrice.current.value && +guitar.price <= +maxPrice.current.value;
    }) : filteredGuitars;
    let filteredGuitarsByType = [];
    for (let guitarTypeToShow in state.guitarTypesToShow) {
      if (state.guitarTypesToShow[guitarTypeToShow]) {
        filteredGuitarsByType = filteredGuitarsByType.concat(filteredGuitars.filter((guitar) => {
          return guitar.type === guitarTypeToShow;
        }));
      }
    }
    filteredGuitars = filteredGuitarsByType ? filteredGuitarsByType : filteredGuitars;
    let filteredGuitarsByStrings = [];
    for (let amountOfStrings in state.amountOfStringsToShow) {
      if (state.amountOfStringsToShow[amountOfStrings]) {
        filteredGuitarsByStrings = filteredGuitarsByStrings.concat(filteredGuitars.filter((guitar) => {
          return guitar.strings === amountOfStrings;
        }));
      }
    }
    filteredGuitars = filteredGuitarsByStrings ? filteredGuitarsByStrings : filteredGuitars;
    setState({
      ...state,
      guitars: filteredGuitars,
      currentSortType: null,
      currentSortDirection: null,
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
    let pageToSwipe;
    switch (direction) {
      case PageDirections.BACKWARD: {
        pageToSwipe = state.currentPage - 1;
        break;
      }
      case PageDirections.FORWARD: {
        pageToSwipe = state.currentPage + 1;
        break;
      }
    }
    setState({
      ...state,
      currentPage: pageToSwipe
    });
  };

  const addToCartPopupHandler = (evt) => {
    if (cart.find((guitar) => guitar.id === evt.target.dataset.id)) {
      return;
    }
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

  return (
    <main className="main">
      <div className="main__wrapper">
        <h1>Каталог гитар</h1>
        <div className="main__crumbs">
          <Link to={`/`}>Главная</Link>
          <Link to={`/`}>Каталог</Link>
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
              {Object.values(SortTypes).map((sortType) => {
                return <button key={sortType} onClick={sortItemsHandler} type="button" className={`main__sorting-button ${state.currentSortType === sortType ? `main__sorting-button--active` : ``}`}>{sortType}</button>;
              })}
              <div className="main__sorting-arrows">
                {Object.values(SortDirections).map((sortDirection) => {
                  return <button key={sortDirection} onClick={sortItemsDirectionHandler} type="button" className={`main__sorting-arrow ${state.currentSortDirection === sortDirection ? `main__sorting-arrow--active` : ``}`} aria-label={sortDirection} data-direction={sortDirection}></button>;
                })}
              </div>
            </div>
            {!state.guitars.length && <p style={{margin: `auto`}}>Нет таких гитар :(</p>}
            <ul className="main__list">
              {state.guitars.slice(setGuitarStartCount(), setGuitarEndCount()).map((guitar) =>
                <GuitarCard key={guitar.id} guitar={guitar} onAddToCartPopupHandler={addToCartPopupHandler}/>
              )}
            </ul>
            {state.guitars.length > 0 && <div className="main__pagination" onClick={paginationHandler}>
              {state.currentPage !== 1 && <button onClick={swipeHandler} className="main__pagination-link main__pagination-link--text">Назад</button>}
              <button className={`main__pagination-link ${state.currentPage === 1 ? `main__pagination-link--active` : ``}`}>1
              </button>
              {(pagesAmount > 2 && state.currentPage === 1 || state.currentPage === 3) && <button className={`main__pagination-link ${state.currentPage === 2 ? `main__pagination-link--active` : ``}`}>2</button>}
              {state.currentPage > 3 && <button className="main__pagination-link main__pagination-link--dots">...</button>}
              {state.currentPage >= 2 && state.currentPage < pagesAmount && <button className="main__pagination-link main__pagination-link--active">{state.currentPage}</button>}
              {state.currentPage > 0 && state.currentPage < pagesAmount - 2 && <button className="main__pagination-link main__pagination-link--dots">...</button>}
              {(pagesAmount > 3 && (state.currentPage === pagesAmount || state.currentPage === pagesAmount - 2)) && <button className={`main__pagination-link ${state.currentPage === pagesAmount - 1 ? `main__pagination-link--active` : ``}`}>{pagesAmount - 1}</button>}
              {pagesAmount > 1 && <button className={`main__pagination-link ${state.currentPage === pagesAmount ? `main__pagination-link--active` : ``}`}>{pagesAmount}</button>}
              <button onClick={swipeHandler} className={`main__pagination-link main__pagination-link--text ${state.currentPage === pagesAmount ? `main__pagination-link--hidden` : ``}`}>Далее</button>
            </div>}
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
