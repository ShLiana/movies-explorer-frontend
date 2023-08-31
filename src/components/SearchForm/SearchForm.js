// SearchForm — форма поиска, куда пользователь будет вводить запрос
import React from 'react';
import './SearchForm.css';
import Checkbox from '../Checkbox/Checkbox';
import { useEffect, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

const SearchForm = ({ onSubmit, onCheckbox, checked, defaultValue }) => {
  const { isValid, handleChange } = useFormWithValidation();
  const [isErrorWarning, setIsErrorWarning] = useState(''); // Переменная состояния ошибки
  const [isKeyword, setIsKeyword] = useState(''); // Введёные значения по ключевому слову
  
  // Эффект отслеживания состояния поля input поиска
  useEffect(() => {
    setIsKeyword(defaultValue);
  }, [defaultValue]);

  // обработчик вводимых данных
  const handleFormChange = (event) => {
    setIsKeyword(event.target.value);
    handleChange(event);
  };
  // обработчик сабмита формы поиска фильмов
  const searchFormSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      setIsErrorWarning('Введите ключевое слово');
      return;
    }
    onSubmit(isKeyword);
  };

  return (
    <form className='searchform' noValidate onSubmit={searchFormSubmit}>
      <div className='searchform__input-container'>
        <input
          className='searchform__input'
          placeholder='Фильм'
          required
          id='movie'
          name='movie'
          minLength='1'
          maxLength='20'
          value={isKeyword || ''}
          onChange={handleFormChange}
        >
        </input>
        <button className='searchform__button-find' type='submit'>
        </button>
      </div>
      <span className='searchform__error-warning'>{!isValid && isErrorWarning}</span>
      <Checkbox onCheckbox={onCheckbox} checked={checked}/>
    </form>
  );
};

export default SearchForm;

