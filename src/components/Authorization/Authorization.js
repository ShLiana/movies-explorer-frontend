// Authorization — авторизация и регистрация пользователя
import { Link } from 'react-router-dom';
import './Authorization.css';
import Logo from '../../images/logo.svg';

const Authorization = ({ title, children, subtitle, route, link }) => {
  return (
    <section className='authorization'>
      <Link to='/'>
        <img className='authorization__logo' src={Logo} alt='Логотип сайта'></img>
      </Link>
      <h2 className='authorization__title'>{title}</h2>
      {children}
      <p className='authorization__text-hint'>
        {subtitle}
        <Link to={route} className='authorization__link'>
          {link}
        </Link>
      </p>
    </section>
  );
};

export default Authorization;

