// Файл SendPage.js
// Основні моменти файлу SendPage.js:

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import { generateTransactionId } from "../../modul/AuthActions";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";

export const SendPage = () => {
  // Компонент SendPage відповідає за сторінку відправлення коштів.
  const { user, users, dispatch } = useContext(AuthContext);

  // Стани компонента:
  const [email, setEmail] = useState(""); // Електронна пошта одержувача
  const [amount, setAmount] = useState(""); // Сума для відправлення
  const [paymentMethod, setPaymentMethod] = useState("Western Union"); // Метод оплати
  const [isSending, setIsSending] = useState(false); // Флаг, що вказує на процес відправлення

  // Дані з контексту аутентифікації:

  const navigate = useNavigate(); // Функція для навігації між сторінками

  // Обробник події відправлення коштів:
  const handleSend = async (event) => {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    console.log("Handling send...");

    if (isSending) return; // Якщо вже йде процес відправлення, повертаємось
    setIsSending(true); // Встановлюємо флаг, що відправлення в процесі

    // Перевірки:
    if (!email || email === user.email) {
      alert("Недопустимий email одержувача.");
      setIsSending(false);
      return;
    }

    const recipient = users.find((u) => u.email === email);
    if (!recipient) {
      alert("Email одержувача не знайдено в системі.");
      setIsSending(false);
      return;
    }

    // Створюємо об'єкт транзакції:
    const transaction = {
      transactionId: generateTransactionId(),
      time: new Date().toISOString(),
      amount: parseFloat(amount),
      from: user.email,
      to: email,
      type: "send",
      paymentMethod,
      isPending: paymentMethod === "Western Union",
    };

    console.log("Спроба відправити транзакцію:", transaction);

    // Додаємо транзакцію до стану за допомогою dispatch
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

    // Якщо метод оплати "Money Gram", додаємо додаткову транзакцію на отримання
    if (paymentMethod === "Money Gram") {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: {
          ...transaction,
          type: "receive",
          from: user.email,
          to: email,
          isPending: false,
        },
      });
    }

    console.log("Dispatched SEND transaction:", transaction);

    // Переходимо на сторінку балансу
    navigate("/balance");
    setIsSending(false); // Встановлюємо флаг, що відправлення завершено
  };

  // Опис методів оплати
  const paymentDescriptions = {
    "Western Union":
      "Fund transfer with confirmation of receipt. The recipient must enter the name of the sender, the amount and the transaction number",
    "Money Gram":
      "Standard money transfer. After completing the transaction, the funds will be immediately transferred to the recipient's account. Currently, you can only receive funds using the Western Union payment method",
  };
  const pageTitle = "Send money";

  return (
    <div className="default-container-auth">
      <TitleComponent pageTitle={pageTitle} />
      <form onSubmit={handleSend}>
        {/* Форма для введення даних транзакції */}
        <div className="input_field-container">
          <div className="input_field-container">
            <input
              className="input_field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Recipient's email"
              required
            />
            <input
              className="input_field"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            <div className="payment-methods">
              {["Western Union", "Money Gram"].map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />{" "}
                  {method}
                </label>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="continue-button">
          Відправити
        </button>
        <div className="payment-description">
          {paymentDescriptions[paymentMethod]}
        </div>
      </form>
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};

export default SendPage;
