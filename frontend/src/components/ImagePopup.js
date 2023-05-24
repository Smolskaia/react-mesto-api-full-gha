import React from "react";

function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_form_viewer ${card.link ? "popup_opened" : null}`}>
      <div className="popup__container-img">
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__description">{card.name}</h2>
        <button
          className="popup__btn-close"
          type="button"
          title="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
