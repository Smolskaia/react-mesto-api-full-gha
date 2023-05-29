import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, onLoading } = props;

  //переменные состояния name и description
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  
  //вызываем хук валидации
  const { values, errors, isValid, handleChange, setValue, reset, setIsValid  } =useFormValidation() 

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    // setName(currentUser.name);
    // setDescription(currentUser.about);
    if (currentUser) {
      setValue('name', currentUser.name)
      setValue('info', currentUser.about)
      if (currentUser.name && currentUser.about) {
        setIsValid(true)
      }
    } 
  }, [currentUser, isOpen, setValue]);

  // function handleName(evt) {
  //   setName(evt.target.value);
  // }

  // function handleDescription(evt) {
  //   setDescription(evt.target.value);
  // }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values['name'],
      about: values['info'],
    });
  }

  const errorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

  const onClosePopup = () => {
    onClose()
    reset({ 'name': currentUser.name, 'info': currentUser.about }, true)
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      isValid={isValid}
      children={
        <>
          <label className="popup__label">
            <input
              name="name"
              id="username"
              type="text"
              placeholder="Имя"
              className="popup__input popup__input_text_name"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange} //{handleName} 
              value={values['name'] ?? ""}
            />
            <span className={errorClassName('name')}>{errors['name']}</span>
          </label>
          <label className="popup__label">
            <input
              name="info"
              id="profile-info"
              type="text"
              placeholder="О себе"
              className="popup__input popup__input_text_info"
              required
              minLength="2"
              maxLength="200"
              onChange={handleChange} //{handleDescription}
              value={values['info'] ?? ""}
            />
            <span className={errorClassName('info')}>{errors['info']}</span>
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
