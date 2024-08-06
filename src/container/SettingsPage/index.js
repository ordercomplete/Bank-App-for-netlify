// Файл SettingsPage
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import { Link } from "react-router-dom";

import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";
// import "./style.css";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { dispatch, user, users } = useContext(AuthContext);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // Local state for managing input fields
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordForEmail, setPasswordForEmail] = useState("");
  const [passwordForPassword, setPasswordForPassword] = useState("");

  // Separate error states for each field
  const [newEmailError, setNewEmailError] = useState(false);
  const [passwordForEmailError, setPasswordForEmailError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [passwordForPasswordError, setPasswordForPasswordError] =
    useState(false);

  const handleChangeEmail = (event) => {
    event.preventDefault();
    const { newEmail, password } = event.target.elements;

    let isError = false;

    console.log("Current user:", user);
    console.log("All users:", users);
    console.log("New email entered:", newEmail.value);

    setNewEmailError(false);
    setPasswordForEmailError(false);

    //Проблема може виникати через те, що стан users може містити користувача з поточним email, спричиняючи хибне проходження першої перевірки, оскільки друга перевірка виявляє співпадіння. Замість простих умов if, можна спробувати покращити логіку перевірки, аби обидві умови працювали коректно. Скористайтеся логікою раннього виходу (early return), яка дозволяє негайно вийти з функції, якщо умова true. Це допомагає уникнути зайвої обробки.

    if (user && user.password === passwordForEmail) {
      if (user.email === newEmail.value) {
        setEmailErrorMsg("You cannot change the email to the current one");
        setNewEmailError(true);
        setNewEmail("");
        // isError = true;
        return;
      }
      if (users.find((u) => u.email === newEmail.value)) {
        setEmailErrorMsg("This email is already registered");
        setNewEmailError(true);
        setNewEmail("");
        // isError = true;
        return;
      }
      if (!isError) {
        dispatch({
          type: "UPDATE_USER_EMAIL",
          payload: { oldEmail: user.email, newEmail: newEmail.value },
        });
        console.log("Email updated.");
        setEmailErrorMsg("");
        setNewEmailError(false);
        setPasswordForEmailError(false);
        setNewEmail("");
        setPasswordForEmail("");
        // Prompt user to re-login
        if (
          window.confirm(
            "Email was successfully updated. Would you like to log out to apply changes?"
          )
        ) {
          handleLogout();
        }
      }
    } else {
      setPasswordForEmail("");
      setEmailErrorMsg("The current password is incorrect");
      setPasswordForEmailError(true);
      console.log("The current password is incorrect");
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (user && user.password === passwordForPassword) {
      dispatch({
        type: "UPDATE_USER_PASSWORD",
        payload: { email: user.email, newPassword: newPassword },
      });
      console.log("Password updated.");
      setPasswordErrorMsg("");
      setNewPasswordError(false);
      setPasswordForPasswordError(false);
      setNewPassword("");
      setPasswordForPassword("");
      // Prompt user to re-login
      if (
        window.confirm(
          "Password was successfully updated. Would you like to log out to apply changes?"
        )
      ) {
        handleLogout();
      }
    } else {
      setPasswordForPassword("");
      setPasswordErrorMsg("The current password is incorrect");
      setPasswordForPasswordError(true);
      console.log("The current password is incorrect");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (user && user.email) {
    console.log(`Current user email: ${user.email}`);
  }

  const pageTitle = "Settings"; // передати  заголовок

  return (
    <div className="default-container-auth jost-font-text">
      <TitleComponent pageTitle={pageTitle} />

      <div className="scroll-block">
        <form onSubmit={handleChangeEmail}>
          <div className="input_field-container">
            <label htmlFor="newEmail" className="input_label">
              New email
            </label>
            <input
              className={`input_field ${newEmailError ? "error" : ""}`}
              name="newEmail"
              type="email"
              placeholder={newEmailError ? emailErrorMsg : "New email"}
              value={newEmail}
              onChange={(e) => {
                setNewEmailError(false);
                setNewEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="passwordForEmail" className="input_label">
              Current password
            </label>
            <PasswordInput
              className={`input_field ${passwordForEmailError ? "error" : ""}`}
              name="passwordForEmail"
              value={passwordForEmail}
              onChange={(e) => {
                setPasswordForEmailError(false);
                setPasswordForEmail(e.target.value);
              }}
              placeholder={
                passwordForEmailError ? emailErrorMsg : "Current password"
              }
              type="password"
            />
            <button type="submit" className="settings-button">
              Save Email
            </button>
          </div>
        </form>

        <div className="button-container-divider"></div>

        <form onSubmit={handleChangePassword}>
          <div className="input_field-container">
            <label htmlFor="newPassword" className="input_label">
              New password
            </label>
            <PasswordInput
              className={`input_field ${newPasswordError ? "error" : ""}`}
              name="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPasswordError(false);
                setNewPassword(e.target.value);
              }}
              placeholder={newPasswordError ? passwordErrorMsg : "New password"}
              type="password"
            />

            <label htmlFor="passwordForPassword" className="input_label">
              Current password
            </label>
            <PasswordInput
              className={`input_field ${
                passwordForPasswordError ? "error" : ""
              }`}
              name="passwordForPassword"
              value={passwordForPassword}
              onChange={(e) => {
                setPasswordForPasswordError(false);
                setPasswordForPassword(e.target.value);
              }}
              placeholder={
                passwordForPasswordError ? passwordErrorMsg : "Current password"
              }
              type="password"
            />
            <button type="submit" className="settings-button">
              Save password
            </button>
          </div>
        </form>
        <div className="button-container-divider"></div>
        <div className="input_field-container">
          <Link to="/delete-account" className="delete-button">
            Delete account
          </Link>
          <button onClick={handleLogout} className="settings-button">
            Sign out
          </button>
        </div>
      </div>
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};

export default SettingsPage;

// Детальний опис файлу SettingsPage.js:

// Імпорти:
// Основні модулі та хуки React, включаючи useContext та useState.
// Компонент useNavigate для навігації.
// Контекст аутентифікації AuthContext.
// Компоненти Link, PasswordInput, TitleComponent та UsersBlock.

// Компонент SettingsPage:
// Отримує dispatch, user та users з контексту аутентифікації.
// Використовує стани для керування введеними даними та помилками:
// newEmail, newPassword, passwordForEmail, passwordForPassword
// newEmailError, passwordForEmailError, newPasswordError, passwordForPasswordError
// emailErrorMsg, passwordErrorMsg
// Визначає функції handleChangeEmail та handleChangePassword для оновлення email та пароля користувача.
// Визначає функцію handleLogout для виходу користувача з системи.

// Функція handleChangeEmail:
// Перевіряє, чи поточний пароль користувача є правильним.
// Перевіряє, чи новий email не збігається з поточним email користувача.
// Перевіряє, чи новий email не вже зареєстрований іншим користувачем.
// Якщо всі перевірки пройдені успішно, оновлює email користувача за допомогою dispatch з типом UPDATE_USER_EMAIL.
// Якщо пароль невірний, встановлює відповідну помилку.
// Після успішного оновлення email, пропонує користувачеві вийти з системи, щоб застосувати зміни.

// Функція handleChangePassword:
// Перевіряє, чи поточний пароль користувача є правильним.
// Якщо пароль правильний, оновлює пароль користувача за допомогою dispatch з типом UPDATE_USER_PASSWORD.
// Якщо пароль невірний, встановлює відповідну помилку.
// Після успішного оновлення пароля, пропонує користувачеві вийти з системи, щоб застосувати зміни.

// Рендеринг сторінки налаштувань:
// Використовує компонент TitleComponent для відображення заголовку сторінки.
// Відображає форми для оновлення email та пароля користувача.
// Використовує компонент PasswordInput для введення пароля.
// Додає кнопки "Зберегти Email" та "Зберегти пароль" для подачі відповідних форм.
// Додає посилання на сторінку видалення облікового запису та кнопку "Вийти" для виходу з системи.
// Використовує компонент UsersBlock для відображення інформації про поточного користувача.

// Загалом, файл SettingsPage.js відповідає за реалізацію сторінки налаштувань користувача.
// Він дозволяє користувачеві змінити свій email та пароль, а також надає можливість видалити обліковий запис та вийти з системи.
