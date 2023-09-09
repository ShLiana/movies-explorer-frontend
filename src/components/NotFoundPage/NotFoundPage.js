//NotFoundPage — компонент страницы c ошибкой 404 - страница не найдена
import React from 'react';
import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className='not-found-page'>
      <h2 className='not-found-page__title'>404</h2>
      <p className='not-found-page__warning-text'>Страница не найдена</p>
      <button className='not-found-page__back-button' onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
};

export default NotFoundPage;

