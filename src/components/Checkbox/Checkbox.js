// Checkbox — компонент для чекбокса короткометражки
import './Checkbox.css';

const Checkbox = ({ onCheckbox, checked }) => {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        id='checkbox'
        type='checkbox'
        name='checkbox'
        onChange={onCheckbox}
        checked={checked}
      />
      <label className='checkbox__name'>
        Короткометражки
      </label>
    </div>
  );
};

export default Checkbox;

