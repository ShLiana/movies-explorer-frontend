//Footer — презентационный компонент, который отрисовывает подвал
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__container'>
        <span className='footer__copyright'>&copy; {currentYear}</span>
        <div className='footer__links'>
          <a
            className='footer__link-item '
            target='_blank'
            rel='noreferrer'
            href='https://practicum.yandex.ru'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link-item'
            target='_blank'
            rel='noreferrer'
            href='https://github.com/ShLiana'
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;


