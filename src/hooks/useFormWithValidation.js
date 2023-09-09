import { useCallback, useState } from 'react';
import { isEmail } from 'validator';

//хук управления формой и валидации формы
export const useFormWithValidation = () => {
  const [values, setValues] = useState({}); // Введённые значения
  const [errors, setErrors] = useState({}); // Переменная состояния ошибки
  const [isValid, setIsValid] = useState(false); // Переменная состояния валидности инпута

  // обработчик вводимых данных
  const handleChange = (event) => {
    const target = event.target;
      const name = target.name;
      const value = target.value;
      console.log('event target: ', event.target.validationMessage);

    if (name === 'email') {
      const emailError = !isEmail(value)
        ? 'Неверный формат электронной почты'
        : '';
        event.target.setCustomValidity(emailError);
      setErrors({ ...errors, [name]: emailError });
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
    }

    setIsValid(event.target.closest('form').checkValidity());  
    setValues({ ...values, [name]: value });  
  };

  // обработчик очистки формы
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  // вернуть все обработчики и стейты
  return { values, handleChange, errors, isValid, resetForm, setValues };
};

