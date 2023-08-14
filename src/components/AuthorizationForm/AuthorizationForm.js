// Форма авторизации пользователя
import './AuthorizationForm.css';

const AuthorizationForm = ({ label, error, name, type, placeholder, ...rest }) => {
  return (
    <div className='authorization-form'>
      <label className='authorization-form__label'>{label}</label>
      <label className='authorization-form__label'>{placeholder}</label>
      <input className='authorization-form__input' name={name} type={type} {...rest} />
      <span className='authorization-form__error-text'>{error}</span>
    </div>
  );
};

export default AuthorizationForm;

