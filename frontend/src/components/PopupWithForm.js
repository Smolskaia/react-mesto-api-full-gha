/* Во всех 3-х попапх с формами есть общее содержимое: внешняя обертка попапа, 
контейнер с содержимым, форма, кнопка сабмите и кнопка закрытия.

Все это записывается просто в виде разметки в JSX компонента PopupWithForm.
А вот инпуты (и даже их количество) в разных попапах разные.
И вот эти самые инпуты вместе с элементами для показа ошибок передаются в 
компонент PopupWithForm между тегами <PopupWithForm> и </PopupWithForm> в 
качестве пропса children.*/

import React from "react";

function PopupWithForm(props) {
  const { name, title, children, btnText, isOpen, onClose, onSubmit, isValid } =
    props;
  return (
    <div className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}

          <button
            type="submit"
            className={`popup__btn-save ${isValid ? '' : 'popup__btn-save_disabled'}`
            }
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
