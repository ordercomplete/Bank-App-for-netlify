import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import { updatePassword } from "../../modul/AuthActions";
import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";

export const RecoveryConfirmPage = () => {
  const navigate = useNavigate();
  // Використовуємо хук useNavigate для навігації між сторінками

  const location = useLocation();
  // Використовуємо хук useLocation для отримання даних переданих з попередньої сторінки (RecoveryPage)

  const { email, code } = location.state;
  // Отримуємо email та код відновлення з стану сторінки (дані, передані з RecoveryPage)

  const { users, dispatch } = useContext(AuthContext);
  // Використовуємо контекст для доступу до списку користувачів та функції dispatch

  const user = users.find((user) => user.email === email);
  // Знаходимо користувача в списку користувачів за його email

  const [recoveryCode, setRecoveryCode] = useState("");
  // Створюємо стан для введення коду відновлення

  const [newPassword, setNewPassword] = useState("");
  // Створюємо стан для введення нового пароля

  if (!user) {
    alert("User not found");
    // Покажемо попередження, якщо користувач не знайдений
    console.log("Recovery Confirm Page: User not found", email);
    // Логування помилки
    return null;
    // Повертаємо null, щоб уникнути рендерингу сторінки
  }

  console.log("Selected user for recovery:", user);
  // Логування вибраного користувача

  const handleRestore = (event) => {
    event.preventDefault();
    // Запобігаємо перезавантаженню сторінки при відправці форми

    if (recoveryCode === code) {
      // Перевірка чи введений код співпадає з кодом з RecoveryPage
      const updateResponse = updatePassword(email, newPassword, dispatch);
      // Виклик функції для оновлення пароля

      if (updateResponse.success) {
        console.log(`Password for ${email} changed successfully.`);
        navigate("/signin");
        // Перенаправлення на сторінку входу після успішного оновлення пароля
      } else {
        console.log(updateResponse.message);
        // Логування повідомлення про помилку
      }
    } else {
      console.log("Incorrect verification code. Please try again.");
      // Логування про неправильний код відновлення
    }
  };

  const pageTitle = "Settings";
  // Заголовок сторінки, який можна змінити за потреби

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />
      {/* Відображаємо заголовок сторінки */}
      <h4 className="text-under-title">Write the code you received</h4>
      {/* Підзаголовок сторінки */}
      <form onSubmit={handleRestore}>
        {/* Форма для введення коду відновлення та нового пароля */}
        <div className="input_field-container">
          <PasswordInput
            name="recoveryCode"
            value={recoveryCode}
            // Значення стану recoveryCode
            onChange={(e) => setRecoveryCode(e.target.value)}
            // Обробник зміни, який оновлює стан recoveryCode при кожній зміні в полі вводу
            placeholder="Enter Code"
            // Плейсхолдер для поля вводу коду відновлення
          />
          <PasswordInput
            name="newPassword"
            value={newPassword}
            // Значення стану newPassword
            onChange={(e) => setNewPassword(e.target.value)}
            // Обробник зміни, який оновлює стан newPassword при кожній зміні в полі вводу
            placeholder="New Password"
            // Плейсхолдер для поля вводу нового паролю
          />
        </div>
        <button type="submit" className="continue-button">
          {/* Кнопка для відправки форми */}
          Restore Password
          {/* Текст кнопки, що відображає функціонал */}
        </button>
      </form>
    </div>
  );
};

export default RecoveryConfirmPage;
// Експортуємо компонент для використання в інших частинах додатка
