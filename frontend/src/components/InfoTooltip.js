// компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации
import React from "react";

function InfoTooltip({  image, title, isOpen, onClose, }) {
  return (
    <div className={`popup popup__infoTooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
        <img className="popup__pic" src={image} alt={title} />
        <h2 className="popup__text">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
