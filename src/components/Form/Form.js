// Form — форма авторизации и регистрации пользователя
import "./Form.css";
import ButtonSubmitAuth from "../ButtonSubmitAuth/ButtonSubmitAuth";

const Form = ({ children, onSubmit, errorMessage, text, disabled }) => {
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {children}
      <span className='form__error'>{errorMessage}</span>
      <ButtonSubmitAuth type="submit" text={text} disabled={disabled} />
    </form>
  );
};

export default Form;
