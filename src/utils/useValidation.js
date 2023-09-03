import { useState, useCallback } from "react";

// Функция для валидации email
function validateEmail(email) {
  // Регулярное выражение для проверки email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  let isValidEmail = true;

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });


    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setErrors({ ...errors, [name]: isValidEmail ? "" : "Введите корректный email" });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    const isFormValid = target.closest("form").checkValidity();
    setIsValid(isValidEmail && isFormValid);
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
