// Файл AuthRoute
import React, { useContext } from "react"; // Імпортуємо необхідні бібліотеки з React.
import { Navigate } from "react-router-dom"; // Імпортуємо Navigate для переходу між сторінками.
import { AuthContext } from "./AuthContext"; // Імпортуємо AuthContext для доступу до даних автентифікації.

const AuthRoute = ({ children }) => {
  // Оголошення компонента AuthRoute, який приймає дочірні елементи.
  const { token } = useContext(AuthContext); // Використовуємо useContext, щоб отримати значення token з AuthContext.

  if (token) {
    // Якщо токен існує (користувач авторизований),
    return <Navigate to="/balance" />; // перенаправляємо користувача на сторінку балансу.
  }

  return children; // Інакше повертаємо дочірні елементи, дозоляючи доступ до маршруту.
};

export default AuthRoute; // Експортуємо компонент AuthRoute за замовчуванням.
