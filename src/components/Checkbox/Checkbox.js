// Checkbox — компонент для чекбокса короткометражки
import './Checkbox.css';

const Checkbox = () => {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        id='checkbox'
        type='checkbox'
        value='yes'
      />
      <label className='checkbox__name'>
        Короткометражки
      </label>
    </div>
  );
};

export default Checkbox;

