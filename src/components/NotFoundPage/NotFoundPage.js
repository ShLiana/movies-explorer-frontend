//NotFoundPage — компонент страницы c ошибкой 404 - страница не найдена
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <section className='not-found-page'>
      <h2 className='not-found-page__title'>404</h2>
      <p className='not-found-page__warning-text'>Страница не найдена</p>
      <Link to='/' className='not-found-page__back-button'>
        Назад
      </Link>
    </section>
  );
};

export default NotFoundPage;

