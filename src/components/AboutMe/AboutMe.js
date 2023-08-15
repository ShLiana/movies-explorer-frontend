// AboutMe — компонент с информацией обо мне
import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/about-me__avatar.jpg';

const AboutMe = () => {
  return (
    <section className='about-me' id='student'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__block'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Лиана</h3>
          <p className='about-me__job'>Веб-разработчик, 35 лет</p>
          <p className='about-me__description'>
            Я&nbsp;родилась и живу в городе&nbsp;Уфе. Я закончила
            факультет авиационного приборостроения ФГБОУ ВПО "УГАТУ" по двум
            направлениям - биомедицинские аппараты и системы и
            электроэнергетика. Сейчас работаю в больнице метрологом и в
            аттестационном центре, где занимаюсь оформлением технической
            документации в области аттестации специалистов сварочного
            производства на особо-опасные объекты.
          </p>
          <a
            className='about-me__github-link'
            href='https://github.com/ShLiana'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about-me__avatar' src={myPhoto} alt='Моя фотография' />
      </div>
    </section>
  );
};

export default AboutMe;
