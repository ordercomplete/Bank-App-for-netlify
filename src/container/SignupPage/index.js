//Файл SignupPage.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import { registerUser } from "../../modul/AuthActions";
import Swal from "sweetalert2";
import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";
import "./style.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { dispatch, users } = useContext(AuthContext);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    console.log("Attempting to register user with email:", email);

    setEmailError("");
    setPasswordError("");

    const userExists =
      users && users.some((user) => user && user.email === email);
    if (userExists) {
      setEmailErrorMsg("A user with this email already exists.");
      setEmailError(true);
      setEmail("");
      return;
    }

    const registrationResult = registerUser(email, password, dispatch);

    if (registrationResult.success) {
      Swal.fire({
        title: "Registration Successful",
        html: `<div>
               <p>Your registration was successful. Your confirmation code: <strong id="confirmationCode">${registrationResult.user.confirmationCode}</strong></p>
             </div>`,
        showConfirmButton: true,
        confirmButtonText: "Copy Code",
        willOpen: () => {
          document
            .querySelector(".swal2-confirm")
            .addEventListener("click", () => {
              navigator.clipboard
                .writeText(registrationResult.user.confirmationCode)
                .then(() => {
                  Swal.fire({
                    title: "Copied!",
                    text: "The confirmation code has been copied to the clipboard.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "top-end",
                    toast: true,
                    customClass: {
                      container: "swal2-toast-container",
                      popup: "swal2-toast",
                    },
                  });
                })
                .catch((err) => {
                  console.error("Failed to copy text: ", err);
                });
            });
        },
        willClose: () => {
          dispatch({
            type: "LOGIN",
            payload: {
              token: "temporary_token",
              user: registrationResult.user,
            },
          });

          navigate("/signup-confirm", {
            state: {
              email,
              confirmationCode: registrationResult.user.confirmationCode,
            },
          });
        },
        customClass: {
          popup: "custom-swal-popup",
          content: "custom-swal-content",
        },
      });
    } else {
      setPasswordError(registrationResult.message);
    }
  };

  const pageTitle = "Registration";
  const textUnderTitle = "Choose a registration method";

  return (
    <div className="default-container">
      {/* title ідентичний для всіх сторінок */}
      <TitleComponent pageTitle={pageTitle} textUnderTitle={textUnderTitle} />
      <form onSubmit={handleSignup}>
        <div className="input_field-container">
          <label>Email</label>
          <input
            className={`input_field ${emailError ? "error" : ""}`}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="Enter email"
            placeholder={emailError ? emailErrorMsg : "Enter email"}
            required
          />
        </div>
        <div className="input_field-container">
          <label>Password</label>
          <PasswordInput
            value={password}
            placeholder="Create your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <h5>
            Already have an account? <Link to="/signin">Sign In</Link>
          </h5>
          <button type="submit" className="continue-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

// Детальний опис файлу SignupPage.js:

// Компонент SignupPage:

// Використовує стани email, password, emailError та passwordError для керування введеними даними та помилками.
// Отримує dispatch та users з контексту аутентифікації для реєстрації користувача та перевірки існування користувача.
// Визначає функцію handleSignup, яка обробляє подію форми реєстрації.
// Функція handleSignup:

// Перевіряє, чи вже існує користувач з таким email, і встановлює відповідну помилку, якщо так.
// Викликає функцію registerUser з email, password та dispatch для реєстрації нового користувача.
// Якщо реєстрація успішна, відображає модальне вікно з кодом підтвердження, який можна скопіювати в буфер обміну.
// Після закриття модального вікна, виконує дію LOGIN в контексті аутентифікації та перенаправляє користувача на сторінку підтвердження реєстрації.
// Якщо реєстрація не вдалася, встановлює помилку пароля.
// Рендеринг сторінки реєстрації:

// Використовує компонент TitleComponent для відображення заголовку та тексту під ним.
// Відображає форму реєстрації з полями для email та пароля.
// Використовує компонент PasswordInput для введення пароля.
// Додає посилання на сторінку входу для користувачів, які вже мають обліковий запис.
// Відображає кнопку "Continue" для подачі форми реєстрації.
