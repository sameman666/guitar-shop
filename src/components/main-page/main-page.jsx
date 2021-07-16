import React from 'react';
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';

const MainPage = () => {

  return (
    <React.Fragment>
      <Header/>
      <Catalog/>
      <Footer />
    </React.Fragment>
  );
};

export default MainPage;
