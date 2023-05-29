const apiConfig = {
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.ideafix.nomoredomains.rocks",
  // headers: {
  //   "Content-Type": "application/json",
  // },
};


class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  // проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка карточек с сервера, метод GET по умолчанию
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: { 
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // загрузка данных пользователя с сервера, метод GET по умолчанию
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { 
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // редактирование профиля методом PATCH
  setUserInfo(obj) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // добавление новой карточки, POST-запрос
  addNewCard(cardElement) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardElement.name,
        link: cardElement.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // // поставить лайк, PUT-запрос
  // putLike(cardId) {
  //   const token = localStorage.getItem('jwt');
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: { 
  //       authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => this._checkResponse(res));
  // }

  // // убрать лайк, DELETE-запрос
  // removeLike(cardId) {
  //   const token = localStorage.getItem('jwt');
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: { 
  //       authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => this._checkResponse(res));
  // }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: { 
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // удаление карточки, DELETE-запрос
  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: { 
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // обновление аватара пользователя, PATCH-запрос
  setAvatar(avatarLink) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

// экземпрляр класса Api
export const api = new Api(apiConfig);
