// Компонент DeleteAccountPage:

import React, { useContext, useState } from "react"; // Імпорт React та хуків useContext, useState
import { useNavigate, Link } from "react-router-dom"; // Імпорт хука для навігації useNavigate та компоненту Link
import { AuthContext } from "../../modul/AuthContext"; // Імпорт контексту аутентифікації
import { deleteAccount } from "../../modul/AuthActions";
// Імпорт функції для видалення акаунту
import TitleComponent from "../../component/TitleComponent"; // Імпорт компоненту для відображення заголовку сторінки

export const DeleteAccountPage = () => {
  const navigate = useNavigate(); // Використання хука для навігації
  const { user, users, dispatch } = useContext(AuthContext); // Отримання користувача, масиву користувачів та функції dispatch з контексту
  const [error, setError] = useState(""); // Стан для зберігання помилок

  const handleDelete = (event) => {
    event.preventDefault(); // Запобігання перезавантаженню сторінки за замовчуванням
    const { email, password } = event.target.elements; // Отримання значень полів email та password з форми

    const userToDelete = users.find((user) => user.email === email.value); // Пошук користувача за email

    if (!userToDelete) {
      setError("User not found"); // Встановлення повідомлення про помилку, якщо користувача не знайдено
      console.log("Delete Account: User not found", email.value); // Логування помилки
      return;
    }

    if (userToDelete.password !== password.value) {
      setError("Incorrect password"); // Встановлення повідомлення про помилку, якщо пароль невірний
      console.log("Delete Account: Incorrect password for", email.value); // Логування помилки
      return;
    }

    const deleteResponse = deleteAccount(
      email.value,
      password.value,
      dispatch,
      user
    ); // Виклик функції deleteAccount для видалення акаунту

    if (deleteResponse.success) {
      // Якщо видалення успішне, відправлення дій REMOVE_USER та LOGOUT
      dispatch({
        type: "REMOVE_USER",
        payload: { email: email.value },
      });

      dispatch({
        type: "LOGOUT",
      });
      console.log(`Account ${email.value} deleted.`); // Логування успішного видалення
      alert("Account successfully deleted."); // Відображення повідомлення про успішне видалення
      navigate("/"); // Перенаправлення на головну сторінку
    } else {
      setError(deleteResponse.message); // Встановлення повідомлення про помилку, якщо видалення не вдалося
    }
  };

  const pageTitle = "Delete Account"; // Назва сторінки
  return (
    <div className="default-container-auth">
      <TitleComponent pageTitle={pageTitle} />
      {/* Відображення компонента TitleComponent з переданим заголовком сторінки */}
      <form onSubmit={handleDelete}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="email"
            placeholder="Email"
            required // Обов'язкове поле для введення email
          />
          <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Password"
            required // Обов'язкове поле для введення пароля
          />
        </div>
        {/* Відображення помилки, якщо є */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="continue-button">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountPage; // Експорт компоненту за замовчуванням для використання в інших частинах додатку
