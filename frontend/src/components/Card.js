import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  // контекст пользователя
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__like ${isLiked && "element__like_active"}`);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      <img
        className="element__img"
        src={card.link}
        onClick={handleCardClick}
        alt={card.name}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        {/* в разметке используем переменную isOwn для условного рендеринга */}
        {isOwn && (
          <button
            type="button"
            className="element__delete"
            onClick={handleDeleteClick}
          />
        )}
        <div className="element__like-section">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick} />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
