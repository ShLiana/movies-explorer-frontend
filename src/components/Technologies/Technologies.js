//Technologies — компонент с использованными технологиями
import './Technologies.css';

const Technologies = () => {
  return (
    <section className='technologies' id='technologies' >
      <h2 className='technologies__title'>Технологии</h2>
      <h3 className='technologies__subtitle'>7 технологий</h3>
      <p className='technologies__description'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='technologies__list'>
        <li className='technologies__list-item'>HTML</li>
        <li className='technologies__list-item'>CSS</li>
        <li className='technologies__list-item'>JS</li>
        <li className='technologies__list-item'>React</li>
        <li className='technologies__list-item'>Git</li>
        <li className='technologies__list-item'>Express.js</li>
        <li className='technologies__list-item'>mongoDB</li>
      </ul>
    </section>
  );
};

export default Technologies;

