const BASE_URL = "https://auth.nomoreparties.co";

// аутентификация(регистрация) пользователя
// Эндпоинт: /signup      Метод: POST
// возвращает _id, email
export const register = (email, password) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => check(res));


// авторизации(вход) пользователя
// Эндпоинт: /signin      Метод: POST
// возвращает token
export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => check(res));


// проверка валидности токена - вызывается каждый раз при загрузке приложения
// при успешной проверке мы будем навигейтить в основной раздел
// и не нужно будет заного вводить логин и пароль
// Эндпоинт: /users/me      Метод: GET
// возвращает _id, email
export const checkToken = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => check(res));

// проверка ответа сервера
  function check(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}