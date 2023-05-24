import { useState, useCallback } from 'react'

/* Хук должен хранить в себе значения(values) инпутов, ошибки инпутов(errors), состояния формы(isValid).
 Первоначальные значения формы initialValues передаем параметром в функцию.
 useCallback - хук, который принимает в себя функцию и кеширует ее*/

export function useFormValidation(initialValues = {}) {
  // переменная состояния для хранения значений инпутов
  const [values, setValues] = useState(initialValues)
  // переменная состояния для хранения ошибок инпутов
  const [errors, setErrors] = useState({})
  // переменная состояния для храниения состояния формы валидна/невалидна, чтобы задизейблить кнопку
  const [isValid, setIsValid] = useState(false) //по умолчанию форма невалидна

  //единый обработчик для каждого инпута
  // берет значение инпута, атрибут name, ошибку, форму. Устанавливает это значение, ошибку, если есть 
  //и определяет валидна форма или нет
  const handleChange = (evt) => {
    const { name, value, validationMessage, form } = evt.target
    //установили в переменную состояния values по атрибуту name - value - значение введенное пользователем, сохранили значение в объект 
    setValues((oldValues) => ({ ...oldValues, [name]: value})) 
    //установили в переменную состояния errors по атрибуту name - validationMessage, сохранили значение в объект 
    setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage}))
    setIsValid(form.checkValidity())
  }

  //функция очистки формы
  const reset = (initialValues = {}, valid = false) => {
    setValues({})
    setErrors({})
    setIsValid(valid)
  }

  // функция устанавливает новое значение, которое ввел пользователь
  // при каждом перерендере компонента или при каждом перевызове хука, setValue будет браться из кеша
  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value}))
  }, [])

  return { values, errors, isValid, handleChange, setValue, reset, setIsValid }
}