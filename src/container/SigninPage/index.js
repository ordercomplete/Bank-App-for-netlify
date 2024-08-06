// Файл SigninPage.js
import React, { useContext, useState } from "react"; // Імпортуємо React, useContext і useState з бібліотеки React.
import { useNavigate, Link } from "react-router-dom"; // Імпортуємо useNavigate та Link для навігації.
import { AuthContext } from "../../modul/AuthContext"; // Імпортуємо AuthContext для доступу до даних автентифікації.
import TitleComponent from "../../component/TitleComponent"; // Імпортуємо TitleComponent для відображення заголовка сторінки.
import PasswordInput from "../../component/PasswordInput"; // Імпортуємо PasswordInput для відображення поля введення пароля.

export const SigninPage = () => {
  // Оголошення компонента SigninPage.
  const navigate = useNavigate(); // Використовуємо хук useNavigate для навігації між сторінками.
  const { user, users, dispatch } = useContext(AuthContext); // Витягаємо користувача, список користувачів та dispatch з AuthContext.

  const [passwordForEmailError, setPasswordForEmailError] = useState(false); // Стан для помилки введення пароля.
  const [passwordForEmail, setPasswordForEmail] = useState(""); // Стан для збереження пароля.
  const [emailError, setEmailError] = useState(""); // Стан для помилки введення email.
  const [email, setEmail] = useState(""); // Стан для збереження email.
  const [newEmailError, setNewEmailError] = useState(false); // Стан для нової помилки введення email.

  const handleSignin = (event) => {
    // Функція обробки входу користувача.
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки.
    const { email, password } = event.target.elements; // Витягаємо значення email та password з форми.
    const user = users.find((user) => user.email === email.value); // Знаходимо користувача за email.
    let isError = false; // Ініціалізуємо змінну для відстеження помилок.

    setPasswordForEmailError(false); // Скидаємо помилку введення пароля.
    setEmailError(""); // Скидаємо помилку введення email.

    if (!user) {
      // Якщо користувача не знайдено,
      setNewEmailError(true); // встановлюємо нову помилку email.
      setEmailError("User not found"); // Встановлюємо текст помилки.
      setEmail(""); // Очищаємо поле email.
      return; // Перериваємо виконання функції.
    }

    if (user && user.password !== passwordForEmail) {
      // Якщо користувач знайдений, але пароль невірний,
      setPasswordForEmail(""); // Очищаємо поле пароля.
      setEmailError("Incorrect password"); // Встановлюємо текст помилки.
      setPasswordForEmailError(true); // Встановлюємо помилку введення пароля.
      return; // Перериваємо виконання функції.
    }

    if (!user.confirmed) {
      // Якщо акаунт не підтверджено,
      setEmailError("Account not confirmed"); // Встановлюємо текст помилки про непідтверджений акаунт.
      setNewEmailError(true); // Встановлюємо нову помилку email.
      setEmail(""); // Очищаємо поле email.
      return; // Перериваємо виконання функції.
    }

    if (!isError) {
      // Якщо помилок не виявлено,
      dispatch({
        // Виконуємо dispatch у контексті аутентифікації.
        type: "LOGIN", // Тип дії - логін.
        payload: { token: "some_token", user: user }, // Передаємо токен і дані користувача.
      });

      navigate("/balance"); // Перенаправляємо користувача на сторінку балансу.
    } else {
      setPasswordForEmail(""); // Очищаємо поле пароля.
      setEmailError("Incorrect current password"); // Встановлюємо текст помилки.
      setPasswordForEmailError(true); // Встановлюємо помилку введення пароля.
    }
  };

  const pageTitle = "Sign in"; // Заголовок сторінки.
  const textUnderTitle = "Select login method"; // Текст під заголовком.

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} textUnderTitle={textUnderTitle} />{" "}
      {/* Компонент для заголовка сторінки. */}
      <form onSubmit={handleSignin}>
        {" "}
        {/* Обробник форми входу. */}
        <div className="input_field-container">
          <label htmlFor="email" className="input_label">
            Email {/* Поле для вводу email. */}
          </label>
          <input
            className={`input_field ${newEmailError ? "error" : ""}`} // Додаємо клас error, якщо є помилка email.
            name="email"
            type="email"
            placeholder={newEmailError ? emailError : "Enter email"} // Показуємо текст помилки або підказку.
            value={email || ""} // Встановлюємо значення email.
            onChange={(e) => {
              setNewEmailError(false); // Очищаємо помилку при зміні email.
              setEmail(e.target.value); // Оновлюємо значення email.
            }}
            required // Поле є обов'язковим для заповнення.
          />
        </div>
        <div className="input_field-container">
          <label htmlFor="passwordForEmail" className="input_label">
            Password {/* Поле для вводу пароля. */}
          </label>

          <PasswordInput
            className={`input_field ${passwordForEmailError ? "error" : ""}`} // Додаємо клас error, якщо є помилка пароля.
            name="passwordForEmail"
            value={passwordForEmail} // Встановлюємо значення пароля.
            onChange={(e) => {
              setPasswordForEmailError(false); // Очищаємо помилку при зміні пароля.
              setPasswordForEmail(e.target.value); // Оновлюємо значення пароля.
            }}
            placeholder={passwordForEmailError ? emailError : "Enter password"} // Показуємо текст помилки або підказку.
            type="password"
            required // Поле є обов'язковим для заповнення.
          />
        </div>
        <div className="button-container">
          {" "}
          {/* Блок для кнопок. */}
          <h5>
            Forgot your password? <Link to="/recovery">Restore</Link>{" "}
            {/* Посилання на сторінку відновлення пароля. */}
          </h5>
          <button type="submit" className="continue-button">
            Continue {/* Кнопка для продовження (входу). */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage; // Експортуємо компонент SigninPage за замовчуванням.
