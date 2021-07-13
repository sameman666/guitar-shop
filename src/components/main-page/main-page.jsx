/* eslint-disable no-console */
import React from 'react';
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import PropTypes from 'prop-types';

const MainPage = () => {

  return (
    <React.Fragment>
      <Header/>
      <Catalog/>
      <Footer />
    </React.Fragment>
  );
};

MainPage.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default MainPage;
