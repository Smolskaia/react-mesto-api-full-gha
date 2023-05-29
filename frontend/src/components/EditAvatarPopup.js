import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, onLoading } = props;
  const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

  //вызываем хук валидации
  const { values, errors, isValid, handleChange, setValue, reset, setIsValid } =useFormValidation({avatar: ''})

  useEffect(() => {
    setValue('link', values[''])
    if (values['link']) {
      setIsValid(false)
    }
  }, [isOpen, setValue]);
  
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  
  const errorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

  const onClosePopup = () => {
    onClose()
    reset()
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      btnText={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      isValid={isValid}
      children={
        <>
          <input
            onChange={handleChange}
            name="link"
            id="url-avatar-image"
            type="url"
            placeholder="Ссылка на новый аватар"
            className="popup__input popup__input_text_info"
            required
            ref={avatarRef}
            value={values['link'] ?? ""}
          />
          <span className={errorClassName('link')}>{errors['link']}</span>
        </>
      }
    />
  );
}

export default EditAvatarPopup