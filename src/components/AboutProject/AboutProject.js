// AboutProject — компонент с описанием дипломного проекта
import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project' id='about-project' >
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__block'>
          <h3 className='about-project__heading'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__block'>
          <h3 className='about-project__heading'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__progress'>
        <p className='about-project__progress-line'>1 неделя</p>
        <p className='about-project__progress-line'>4 недели</p>
        <span className='about-project__progress-subtitle'>Back-end</span>
        <span className='about-project__progress-subtitle'>Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;

