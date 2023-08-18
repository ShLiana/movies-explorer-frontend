// Portfolio — компонент со ссылками на другие проекты
import React from 'react';
import './Portfolio.css';
import Arrowlink from "../../images/portfolio-link-arrow.svg";

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
            href='https://github.com/ShLiana/how-to-learn'
          >
            <p className='portfolio__link-title'>Статичный сайт</p>
            <img
                  className="portfolio__arrow-link"
                  src={Arrowlink}
                  alt="Фотография пользователя"
            ></img>
          </a>
        </li>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
            href='https://github.com/ShLiana/russian-travel'
          >
            <p className='portfolio__link-title'>Адаптивный сайт</p>
            <img
                  className="portfolio__arrow-link"
                  src={Arrowlink}
                  alt="Фотография пользователя"
            ></img>
          </a>
        </li>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
            href='https://themesto.students.nomoreparties.sbs'
          >
            <p className='portfolio__link-title'>Одностраничное приложение</p>
            <img
                  className="portfolio__arrow-link"
                  src={Arrowlink}
                  alt="Фотография пользователя"
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;

