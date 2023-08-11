// BurgerMenu — компонент, который отвечает за выпадающий список при уменьшении расширения до 768px
import "./BurgerMenu.css";
import { NavLink, Link } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";

const BurgerMenu = ({ isOpen, onClose }) => {
  const popupBurgerMenuIsOpen = isOpen ? "burger-menu_visible" : "";

  return (
    <div className={`burger-menu ${popupBurgerMenuIsOpen}`}>
      <div className="burger-menu__block">
        <button type="button" className="burger-menu__close-button" onClick={onClose} />
        <div className="burger-menu__navigation-container">
          <NavLink to="/" className="burger-menu__link">
            Главная
          </NavLink>
          <NavLink to="/movies" className="burger-menu__link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="burger-menu__link burger-menu__saved-movies-link">
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to='/profile' className='burger-menu__account'>
        <button className="burger-menu__button_type_account" type="button">
                Аккаунт
              </button>
              <img
                  className="burger-menu__profile-icon"
                  src={profileIcon}
                  alt="Фотография пользователя"
                ></img>
        </Link>
      </div>
    </div>
  );
};

export default BurgerMenu;
