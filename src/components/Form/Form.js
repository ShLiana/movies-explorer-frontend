// Form — форма авторизации и регистрации пользователя
import "./Form.css";
import ButtonSubmitAuth from "../ButtonSubmitAuth/ButtonSubmitAuth";

const Form = ({ children, onSubmit, errorText, text, disabled }) => {
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {children}
      <ButtonSubmitAuth type="submit" text={text} disabled={disabled} />
      <span className="form__error-text">{errorText}</span>
    </form>
  );
};

export default Form;
