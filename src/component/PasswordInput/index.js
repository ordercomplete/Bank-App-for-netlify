import React, { useState } from "react";
import "./style.css"; // Імпорт стилів для компоненту

const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "password",
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false); // Хук для відображення/приховування пароля

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Перемикання видимості пароля
  };

  const handleChange = (e) => {
    if (typeof onChange === "function") {
      onChange(e); // Виклик функції onChange, щоб передати зміни далі
    }
  };

  return (
    <div className="password-input-container">
      <input
        className={`input_field ${className}`} // Композиція класів для стилів
        type={showPassword ? "text" : type} // Визначення типу поля, якщо пароль видимий
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required // Поле є обов'язковим
      />
      {type === "password" && (
        <a
          href="#"
          className={`password-visibility-button ${
            showPassword ? "active" : ""
          }`} // Кнопка для перемикання видимості пароля
          onClick={(e) => {
            e.preventDefault(); // Відміна стандартної поведінки посилання
            togglePasswordVisibility(); // Перемикання видимості пароля
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </a>
      )}
    </div>
  );
};

export default PasswordInput;
