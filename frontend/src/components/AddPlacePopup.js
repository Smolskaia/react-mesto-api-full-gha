import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";


function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, onLoading } = props;

  // const [namePlace, setNamePlace] = useState('');
  // const [linkPlace, setLinkPlace] = useState('');

  //вызываем хук валидации
  const { values, errors, isValid, handleChange, setValue, reset, setIsValid } =useFormValidation()

  useEffect(() => {
    // setNamePlace('');
    // setLinkPlace('');
    setValue('name', values[''])
    setValue('link', values[''])
    if (values['name'] && values['link']) {
      setIsValid(false)
    }
  }, [isOpen, setValue]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      // name: namePlace,
      // link: linkPlace
      name: values['name'],
      link: values['link']
    });
  }

  // function handleChangeNamePlace(evt) {
  //   setNamePlace(evt.target.value);
  // }

  // function handleChangeLinkPlace(evt) {
  //   setLinkPlace(evt.target.value);
  // }

  const errorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

  const onClosePopup = () => {
    onClose()
    reset()
  }

  return (
    <PopupWithForm
            name="add"
            title="Новое место"
            btnText={onLoading ? `Сохранение...` : `Создать`}
            isOpen={isOpen}
            onClose={onClosePopup}
            onSubmit={handleSubmit}
            isValid={isValid}
            children={
              <>
                <label className="popup__label">
                  <input
                    onChange={handleChange} //{handleChangeNamePlace}
                    name="name"
                    id="image-name"
                    type="text"
                    placeholder="Название"
                    className="popup__input popup__input_text_name"
                    required
                    minLength="2"
                    maxLength="30"
                    value={values['name'] ?? ""}
                  />
                  <span className={errorClassName('name')}>{errors['name']}</span>
                </label>
                <label className="popup__label">
                  <input
                    onChange={handleChange} //{handleChangeLinkPlace}
                    name="link"
                    id="url-image"
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_text_info"
                    required
                    value={values['link'] ?? ""}
                  />
                  <span className={errorClassName('link')}>{errors['link']}</span>
                </label>
              </>
            }
          />
  )

}

export default AddPlacePopup;