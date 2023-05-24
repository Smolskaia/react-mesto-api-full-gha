// компонент авторизации(регистрации) пользователя
import { useState, useEffect, useLocation } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth'
// import ProtectedRoute from "./ProtectedRoute";

function Login(props) {
  const { onLogin } = props;
  
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const [ errorMassage, setErrorMessage ] = useState('');

  // const navigate = useNavigate();
  // const location = useLocation()

  // // функция проверки токена
  // const tokenCheck =() => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     return
  //   }
  //   auth.checkToken(token)
  //   .then(res => {
  //     if (res) {
  //       handleLogin(res.data.email)
  //       // console.log(res);
  //       const url = location.state?.returnUrl || '/'
  //       navigate(url)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   tokenCheck()
  // }, [])

  // обработчик берет значение полей инпутов и вызывает функцию переменной состояния,
  // берет предыдущее состояние и меняет на текущее
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = formValue
  //   // здесь обработчик авторизации
  //   auth.authorize(email, password)
  //   .then(data => {
  //     // console.log(email)
  //     if (data.token) {
  //       localStorage.setItem('token', data.token)
  //       onLogin(email)
  //       navigate('/')
  //     }
    
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     setErrorMessage(err)
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue
    onLogin(email, password)
  }

  
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        id="form__auth"
        onSubmit={handleSubmit}
      >
        <label className="auth__label">
          <input
            className="auth__input auth__input_type_email"
            name="email"
            type="email"
            required
            id="email"
            placeholder="Email"
            value={formValue.email || ""}
            onChange={handleChange}
          />
          <span
            id="email-error"
            className="popup__error popup__error_visible"
          >{errorMassage}</span>
        </label>
        <label className="auth__label">
          <input
            className="auth__input auth__input_type_password"
            name="password"
            type="password"
            required
            id="password"
            placeholder="Пароль"
            value={formValue.password || ""}
            onChange={handleChange}
          />
          <span
            id="password-error"
            className="popup__error popup__error_visible"
          >{errorMassage}</span>
        </label>
      </form>
      <button
        className="auth__button"
        type="submit"
        form="form__auth"
      >
        Войти
      </button>
    </div>
  );

}

export default Login;
