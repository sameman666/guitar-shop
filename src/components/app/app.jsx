import React, {useState} from 'react';
import MainPage from '../main-page/main-page';
import CartPage from '../cart-page/cart-page';
import {Switch, Route} from 'react-router-dom';
import {ContextApp} from '../../utils/const';

const App = () => {

  const initialCart = [];
  const [cart, setCart] = useState(initialCart);


  return (
    <ContextApp.Provider value={{cart, setCart}}>
      <Switch>
        <Route exact path="/">
          <MainPage/>
        </Route>
        <Route exact path="/cart">
          <CartPage/>
        </Route>
        <Route>
          <h1 style={{textAlign: `center`}}>404. Not found</h1>
        </Route>
      </Switch>
    </ContextApp.Provider>
  );
};

export default App;
