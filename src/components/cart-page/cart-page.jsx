import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Cart from '../cart/cart';

const CartPage = () => {

  return (
    <React.Fragment>
      <Header/>
      <Cart/>
      <Footer />
    </React.Fragment>
  );
};

export default CartPage;
