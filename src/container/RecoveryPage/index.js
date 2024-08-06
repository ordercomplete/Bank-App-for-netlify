//file RecoveryPage

import React, { useContext, useState } from "react";
// Імпортуємо React та хук useContext для роботи з контекстом, useState для збереження стану
import { useNavigate } from "react-router-dom";
// Імпортуємо хук useNavigate для програмної навігації між сторінками
import Swal from "sweetalert2"; // Імпортуємо бібліотеку SweetAlert2 для показу алертів
import { AuthContext } from "../../modul/AuthContext";
// Імпортуємо AuthContext для доступу до автентифікаційного контексту
import TitleComponent from "../../component/TitleComponent";
// Імпортуємо компонент TitleComponent для відображення заголовку
import "./style.css";
// Імпортуємо стилі для сторінки

// RecoveryPage компонент для відновлення паролю
export const RecoveryPage = () => {
  const navigate = useNavigate();
  // Хук useNavigate для навігації

  const { users } = useContext(AuthContext);
  // Витягуємо масив users з контексту автентифікації

  const [email, setEmail] = useState("");
  // Встановлюємо стан для email
  const [emailError, setEmailError] = useState("");
  // Встановлюємо стан для помилок email

  // Функція для генерації кода відновлення
  const generateRecoveryCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
    // Генеруємо шестизначний код відновлення
  };

  // Обробник форми відновлення
  const handleRecovery = (event) => {
    event.preventDefault();
    // Запобігаємо перезавантаженню сторінки після сабміту форми
    const { email } = event.target.elements;
    // Деструктуруємо email з форми
    const code = generateRecoveryCode();
    // Генеруємо код відновлення
    const user = users.find((user) => user.email === email.value);
    // Знаходимо користувача за вказаним email

    if (!user) {
      setEmailError("User not found");
      // Встановлюємо помилку, якщо користувача не знайдено
      setEmail("");
      // Очищаємо поле email
      console.log("Recovery Page: User not found", email.value);
      // Лог оповіщення, що користувача не знайдено
      return;
    }

    setEmailError("");
    // Очищаємо помилку у полі email
    console.log("Selected user for recovery:", user);
    // Логуємо знайденого користувача

    Swal.fire({
      title: "Recovery Code",
      // Заголовок вікна SweetAlert
      html: `<div class="swal2-window-confirm">
               <p>Recovery code sent to your email: <strong>${email.value}</strong></p>
               <p>Your code: <strong id="recoveryCode">${code}</strong></p>
             </div>`,
      // HTML зміст вікна SweetAlert
      showConfirmButton: true, // Відображення кнопки підтвердження
      confirmButtonText: "Copy Code", // Текст на кнопці підтвердження
      willOpen: () => {
        // Дії при відкритті вікна
        document
          .querySelector(".swal2-confirm")
          .addEventListener("click", () => {
            // Додавання обробника клику на кнопку підтвердження
            navigator.clipboard
              .writeText(code)
              .then(() => {
                // Переміщення коду в буфер обміну
                Swal.fire({
                  title: "Copied!",
                  text: "The recovery code has been copied to the clipboard.",
                  // Повідомлення про успішне копіювання
                  icon: "success",
                  timer: 3000, // Показ повідомлення протягом 3 секунд
                  showConfirmButton: false, // Відображення кнопки підтвердження відсутнє
                  position: "top", // Позиція повідомлення - верх
                  toast: true, // Відображення повідомлення як тост
                  customClass: {
                    container: "swal2-toast-container", // Кастомний клас для контейнера
                    popup: "swal2-toast", // Кастомний клас для спливаючого вікна
                  },
                });
              })
              .catch((err) => {
                console.error("Failed to copy text: ", err);
                // Обробка помилки при копіюванні тексту в буфер обміну
              });
          });
      },
      willClose: () => {
        // Дії при закритті вікна
        navigate("/recovery-confirm", {
          state: { email: email.value, code: code },
          // Програмне перенаправлення на сторінку "recovery-confirm" з передачею стану (email та код)
        });
      },
      customClass: {
        popup: "custom-swal-popup", // Кастомний клас для стилизування спливаючого вікна
        content: "custom-swal-content", // Кастомний клас для стилизування контенту вікна
      },
    });
  };

  const pageTitle = "Recover password";
  // Заголовок сторінки
  const textUnderTitle = "Choose a recovery method";
  // Текст під заголовком

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} textUnderTitle={textUnderTitle} />
      {/* Відображення заголовку та тексту під заголовком, використовуючи компонент TitleComponent */}
      <form onSubmit={handleRecovery}>
        {/* Форма для відновлення паролю з обробником handleRecovery при сабміті */}
        <div className="input_field-container">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          {/* Мітка для поля введення email */}
          <input
            className={`input_field ${emailError ? "error" : ""}`}
            // Поле введення email з умовним додаванням класу "error" у випадку помилки
            name="email"
            type="email"
            placeholder={emailError ? emailError : "Enter email"}
            // Заповнювач поля, який змінюється, якщо є помилка
            value={email}
            // Значення, яке користувач вводить у поле
            onChange={(e) => {
              setEmailError(""); // Очищення помилки під час введення
              setEmail(e.target.value); // Оновлення стану email
            }}
            required
          />
          <button type="submit" className="continue-button">
            Send Code
          </button>
          {/* Кнопка для відправки форми та генерації кода відновлення */}
        </div>
      </form>
    </div>
  );
};

export default RecoveryPage;
// Експортуємо компонент RecoveryPage як експорт за замовчуванням
