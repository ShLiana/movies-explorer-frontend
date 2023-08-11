// NavTab — компонент с навигацией по странице «О проекте»
import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__items'>
        <li className='nav-tab__item'>
          <a className='nav-tab__item-link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__item-link' href='#technologies'>
            Технологии
          </a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__item-link' href='#student'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;