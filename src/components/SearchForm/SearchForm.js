// SearchForm — форма поиска, куда пользователь будет вводить запрос
import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../Checkbox/Checkbox';

const SearchForm = () => {
  return (
    <section className='searchform'>
      <div className='searchform__input-container'>
        <input
          className='searchform__input'
          placeholder='Фильм'
          required
        >
        </input>
        <button className='searchform__button-find' type='submit'>
        </button>
      </div>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;

