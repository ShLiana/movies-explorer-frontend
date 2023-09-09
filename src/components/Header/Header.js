// Header — компонент, который отрисовывает шапку сайта на страницу
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';

const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта' />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;

