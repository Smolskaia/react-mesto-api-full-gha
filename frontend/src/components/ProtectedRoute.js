// HOC— этим компонентом защитите роут /,
//чтобы на него не смогли перейти неавторизованные пользователи
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ loggedIn, element: Component, ...props }) {
  // const {pathname} = useLocation()
 
  
  // если пользователь залогинен, то компонент Main рендерится на странице
  // иначе пользователь оказывается на странице Вход
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate
      to="/sign-in"
      replace
      // state={{ returnUrl: pathname }}
    />
  );
}

export default ProtectedRoute;
