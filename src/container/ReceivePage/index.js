// Файл ReceivePage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import {
  generateTransactionId,
  confirmTransaction,
} from "../../modul/AuthActions";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";

export const ReceivePage = () => {
  // Компонент ReceivePage відповідає за сторінку отримання коштів.

  // Стани компонента:
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Western Union");
  const [isReceiving, setIsReceiving] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Дані з контексту аутентифікації:
  const { user, users, transactions, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // Функція для навігації між сторінками

  // Обробник події отримання коштів:
  const handleReceive = async (event) => {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    console.log("Handling receive...", transactions);

    if (isReceiving) return; // Якщо вже йде процес отримання, повертаємось
    setIsReceiving(true); // Встановлюємо флаг, що отримання в процесі

    // Перевіряємо, чи введено коректний email відправника
    if (!email || email === user.email) {
      alert("Inadmissible sender name");
      setIsReceiving(false);
      return;
    }

    // Знаходимо відправника в базі даних користувачів
    const sender = users.find((u) => u.email === email);
    if (!sender) {
      alert("Sender email not found in the database.");
      setIsReceiving(false);
      return;
    }

    // Перевіряємо, чи існує відповідна транзакція на відправлення
    const transactionAmount = parseFloat(amount);
    const correspondingSendTransaction = transactions.find(
      (tran) =>
        tran.transactionId === transactionId &&
        tran.from === email &&
        tran.to === user.email &&
        tran.amount === transactionAmount &&
        tran.paymentMethod === paymentMethod &&
        tran.type === "send"
    );

    if (
      !correspondingSendTransaction ||
      !correspondingSendTransaction.isPending
    ) {
      alert("No corresponding send transaction found.");
      setIsReceiving(false);
      return;
    }

    // Підтверджуємо транзакцію
    confirmTransaction(correspondingSendTransaction.transactionId, dispatch);

    // Створюємо нову транзакцію на отримання
    const transaction = {
      transactionId: generateTransactionId(),
      time: new Date().toISOString(),
      amount: transactionAmount,
      from: email,
      to: user.email,
      type: "receive",
      paymentMethod,
      isPending: false,
    };

    console.log("Attempting to receive transaction:", transaction);

    // Додаємо транзакцію на отримання до стану
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

    // Додаємо подію отримання коштів до стану
    dispatch({
      type: "ADD_EVENT",
      payload: {
        title: "Receive Money",
        info: `Receive $${transaction.amount} from ${transaction.paymentMethod} at ${transaction.time}`,
      },
    });

    console.log("Dispatched RECEIVE transaction:", transaction);

    // Переходимо на сторінку балансу
    navigate("/balance");
    setIsReceiving(false);
  };

  // Опис методів оплати
  const paymentDescriptions = {
    "Western Union":
      "Fund transfer with confirmation of receipt. The recipient must enter the name of the sender, the amount and the transaction number",
    "Money Gram":
      "Standard money transfer. After completing the transaction, the funds will be immediately transferred to the recipient's account. Currently, you can only receive funds using the Western Union payment method",
  };

  const pageTitle = "Receiv money";

  return (
    <div className="default-container-auth">
      <TitleComponent pageTitle={pageTitle} />
      <form onSubmit={handleReceive}>
        <div className="input_field-container">
          <input
            className="input_field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Sender's email"
            required
          />
          <input
            className="input_field"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the amount"
            required
          />
          <input
            className="input_field"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Transaction ID"
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
                />
                {method}
              </label>
            ))}
          </div>
        </div>
        <div>
          <button type="submit" className="continue-button">
            Confirm
          </button>
        </div>
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

export default ReceivePage;
