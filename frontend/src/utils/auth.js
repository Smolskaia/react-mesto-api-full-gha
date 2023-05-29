// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.ideafix.nomoredomains.rocks"

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
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => check(res))
    .then((data) => {
      localStorage.setItem('jwt', data.token)
      return data;
    });
}
  
// проверка валидности токена - вызывается каждый раз при загрузке приложения
// при успешной проверке мы будем навигейтить в основной раздел
// и не нужно будет заного вводить логин и пароль
// Эндпоинт: /users/me      Метод: GET
// возвращает _id, email
export const checkToken = () => {
  const token = localStorage.getItem('jwt'); 
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => check(res));
}
  

// проверка ответа сервера
  function check(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}