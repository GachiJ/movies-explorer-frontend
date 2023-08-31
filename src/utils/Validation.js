import { useState, useCallback } from "react";

//хук управления формой и валидации формы
export default function Validation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (name === 'email') {
      const isValidEmail = emailRegex.test(value);
      const emailErrorMessage = isValidEmail ? '' : 'Неправильный формат email адреса';
      setErrors({ ...errors, email: emailErrorMessage });
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}