// Файл SignupConfirmPage
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import { confirmUser } from "../../modul/AuthActions";
import TitleComponent from "../../component/TitleComponent";
import PasswordInput from "../../component/PasswordInput";
import Swal from "sweetalert2";

export const SignupConfirmPage = () => {
  const [confirmationCodeInput, setConfirmationCodeInput] = useState("");
  const navigate = useNavigate();
  const { users, dispatch } = useContext(AuthContext);

  const handleConfirm = (event) => {
    event.preventDefault();

    console.log("Entered confirmation code:", confirmationCodeInput);

    if (!users || users.length === 0) {
      console.error("No users found in context.");
      alert("No users available to confirm.");
      return;
    }

    const user = users.find(
      (u) => u.confirmationCode === confirmationCodeInput && !u.confirmed
    );

    if (user) {
      const confirmationResult = confirmUser(
        user.email,
        confirmationCodeInput,
        users,
        dispatch
      );

      if (confirmationResult.success) {
        Swal.fire({
          title: "The code is confirmed",
          text: "You are logged in.",
          icon: "success",
        }).then(() => {
          navigate("/balance");
          console.log("User confirmed and logged in:", user);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid verification code or already used.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid verification code or already used.",
        icon: "error",
      });
    }
  };

  const pageTitle = "Settings";
  const isAuthenticated = true;

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} isAuthenticated={isAuthenticated} />
      <h4 className="text-under-title">Write the code you received</h4>
      <form onSubmit={handleConfirm} className="input_field-container">
        <PasswordInput
          value={confirmationCodeInput}
          onChange={(e) => setConfirmationCodeInput(e.target.value)}
        />
        <button type="submit" className="continue-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default SignupConfirmPage;

// Детальний опис файлу SignupConfirmPage.js:

// Імпорти:

// Основні модулі та хуки React, включаючи useState та useContext.
// Компонент useNavigate для навігації.
// Контекст аутентифікації AuthContext та дія confirmUser з AuthActions.
// Компоненти TitleComponent та PasswordInput.
// Бібліотека Swal для відображення модальних вікон.
// Компонент SignupConfirmPage:

// Використовує стан confirmationCodeInput для керування введеним кодом підтвердження.
// Отримує users та dispatch з контексту аутентифікації для підтвердження користувача.
// Визначає функцію handleConfirm, яка обробляє подію форми підтвердження.
// Функція handleConfirm:

// Перевіряє, чи є користувачі в контексті аутентифікації, і виводить повідомлення про помилку, якщо ні.
// Знаходить користувача, який ще не підтверджений, з введеним кодом підтвердження.
// Викликає функцію confirmUser з email користувача, кодом підтвердження, списком користувачів та dispatch для підтвердження користувача.
// Якщо підтвердження успішне, відображає модальне вікно з повідомленням про успішне підтвердження та перенаправляє користувача на сторінку балансу.
// Якщо підтвердження не вдалося, відображає модальне вікно з повідомленням про помилку.
// Рендеринг сторінки підтвердження реєстрації:

// Використовує компонент TitleComponent для відображення заголовку сторінки та інформації про автентифікацію.
// Відображає текст "Write the code you received" під заголовком.
// Використовує компонент PasswordInput для введення коду підтвердження.
// Додає кнопку "Підтвердити" для подачі форми підтвердження.
// Загалом, файл SignupConfirmPage.js відповідає за реалізацію сторінки підтвердження реєстрації користувача. Він дозволяє користувачеві ввести код підтвердження, який був отриманий під час реєстрації, і підтверджує обліковий запис користувача. Після успішного підтвердження, користувач перенаправляється на сторінку балансу.
