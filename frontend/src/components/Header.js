import React from "react";
import logo from "../images/header-logo.svg";
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header(props) {
  const { email } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  function signOut() {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }
  // console.log(email);
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип проекта Место"
      />
      <div className="header__wrapper">
        {pathname === '/' && <p className="header__mail">{email}</p>}
        {pathname === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>}
        {pathname === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
        {pathname === '/' && <Link to="/sign-in" className="header__link"onClick={signOut}>Выйти</Link>}
      </div>
    </header>
  );
}

export default Header;
