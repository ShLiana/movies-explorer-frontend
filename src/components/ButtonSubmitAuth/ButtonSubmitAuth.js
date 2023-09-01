// ButtonSubmitAuth — кнопка отправки запроса на авторизацию
import './ButtonSubmitAuth.css';

const ButtonSubmitAuth = ({ text, isDisabled, ...rest }) => {
  const ButtonSubmitAuthStatus =  `${isDisabled ? 'button-submit-auth button-submit-auth:disabled' : 'button-submit-auth button-submit-auth:hover'}`
  return (
    <button className={ButtonSubmitAuthStatus} type='submit' disabled={isDisabled} text={text} {...rest}>
      {text}
    </button>
  );
};

export default ButtonSubmitAuth;

