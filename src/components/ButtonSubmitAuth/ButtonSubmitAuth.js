// ButtonSubmitAuth — кнопка отправки запроса на авторизацию
import './ButtonSubmitAuth.css';

const ButtonSubmitAuth = ({ text, isDisabled }) => {
  return (
    <button className='button-submit-auth' type='submit' disabled={isDisabled} text={text}>
      {text}
    </button>
  );
};

export default ButtonSubmitAuth;

