//Файл UsersPage.js
// Імпорт потрібних бібліотек та компонентів
import React, { useContext } from "react"; // Імпортується React та хук useContext для роботи з контекстом.
import { Link, useNavigate } from "react-router-dom"; // Імпорт компоненту Link для навігації та useNavigate для переспрямування.
import { AuthContext } from "../../modul/AuthContext"; // Імпортування контексту авторизації.
import { deleteUserAccount } from "../../modul/AuthActions"; // Імпортування функції для видалення облікового запису користувача.
import TitleComponent from "../../component/TitleComponent"; // Імпорт компоненту заголовка сторінки.
import UsersBlock from "../../component/UsersBlock"; // Імпорт компоненту блоку користувачів.
import "./style.css"; // Імпортування стилів для сторінки.
import { CalculateBalance } from "../../component/СalculateBalance";

export const UsersPage = () => {
  // Оголошення функціонального компоненту UsersPage.
  const { users, user, dispatch, transactions } = useContext(AuthContext); // Отримання списку користувачів, поточного користувача та dispatch з контексту авторизації.
  const navigate = useNavigate(); // Ініціалізація хука нового роутингу.

  const handleDelete = (userEmail) => {
    // Оголошення функції для обробки видалення користувача.
    if (
      user.isAdmin && // Перевірка, чи поточний користувач є адміністратором.
      window.confirm(`Are you sure you want to delete ${userEmail}?`) // Виведення підтвердження для видалення користувача.
    ) {
      deleteUserAccount(userEmail, dispatch); // Виклик функції для видалення облікового запису.
    } else {
      alert("You don't have permission to delete this account."); // Виведення повідомлення про неможливість видалення облікового запису.
    }
  };

  const handleViewUserTransactions = (userId) => {
    // Оголошення функції для перегляду даних користувача.
    navigate(`/user-transactions/${userId}`); // Переспрямування на сторінку з даними користувача за його ID.
  };

  const handleViewUserNotifications = (userId) => {
    // Оголошення функції для перегляду нотифікацій користувача.
    navigate(`/user-notifications/${userId}`); // Переспрямування на сторінку з нотифікаціями користувача за його ID.
  };

  const pageTitle = "Users"; // Встановлення заголовка сторінки.

  return (
    <div className="default-container-auth jost-font-text">
      {/* Дефолтний контейнер з CSS класами */}
      <TitleComponent pageTitle={pageTitle} />
      {/* Компонент з заголовком сторінки, передається заголовок */}
      <div className="user-data-list">
        {/* Контейнер для списку користувачів */}
        {users.map(
          (
            u // Мапування кожного користувача з масиву users.
          ) => (
            <div key={u.id} className="user-data-item">
              {/* Ідентифікація кожного користувача за допомогою унікального ключа */}
              <div className="user-data">
                {/* Контейнер для даних користувача */}
                <strong>Email:</strong> {u.email}
                <br />
                <strong>Confirmed:</strong> {u.confirmed ? "Yes" : "No"}
                {/* Відображення статусу підтвердження */}
                <br />
                <strong>Admin:</strong> {u.isAdmin ? "Yes" : "No"}
                {/* Відображення адміністративного статусу */}
                <br />
                <strong>Balance:</strong>{" "}
                {u.balance ? (
                  <CalculateBalance
                    userEmail={u.email}
                    transactions={transactions}
                  />
                ) : (
                  "N/A"
                )}
                {/* Відображення балансу користувача */}
                <br />
              </div>

              <div className="user-actions">
                {/* Контейнер для дій над користувачем */}
                <button
                  onClick={() => handleViewUserTransactions(u.id)} // Виклик функції перегляду даних користувача з передаванням його ID.
                  className="user-transactions-button"
                >
                  Transactions
                  {/* Кнопка для перегляду транзакцій користувача */}
                </button>
                <button
                  onClick={() => handleViewUserNotifications(u.id)} // Виклик функції перегляду нотифікацій користувача з передаванням його ID.
                  className="user-notifications-button"
                >
                  Notifications
                  {/* Кнопка для перегляду нотифікацій користувача */}
                </button>
                {user.isAdmin && ( // Якщо поточний користувач є адміністратором, додатково створюється кнопка видалення
                  <button
                    onClick={() => handleDelete(u.email)} // Виклик функції видалення користувача з передаванням його email.
                    className="user-delete-button"
                  >
                    Delete Account
                    {/* Текст кнопки для видалення облікового запису */}
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
      <UsersBlock user={user} />
      {/* Компонент для виведення блоку користувачів, передача поточного користувача як пропс */}
    </div>
  );
};

export default UsersPage; // Експорт компонента за замовчуванням для його використання в інших частинах додатка.
