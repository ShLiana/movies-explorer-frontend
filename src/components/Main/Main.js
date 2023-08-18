//Main — компонент страницы «О проекте»
import React from 'react';
import Promo from '../Promo/Promo';
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Technologies from '../Technologies/Technologies';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import './Main.css';

const Main = () => {
  return (
    <>
      <Header />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Technologies />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;
