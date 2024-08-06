//file TransactionList
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import transNotPending from "../../IconsSvg/transNotPending.svg";
import transSend from "../../IconsSvg/transSend.svg";
import transReceive from "../../IconsSvg/transReceive.svg";
import "./style.css";

const TransactionList = ({ transactions: propTransactions }) => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("time"); // Новий стан для фільтра

  // Оновлюємо час для кожної транзакції кожні 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) => ({
          ...transaction,
          timeElapsed: timeElapsed(transaction.time),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Фільтруємо та сортуємо транзакції при зміні пропсів транзакцій або користувача
  useEffect(() => {
    let filteredTransactions;

    if (user.isAdmin) {
      // Якщо користувач адмін, тоді показуємо всі транзакції
      filteredTransactions = propTransactions;
    } else {
      // Якщо користувач не є адміном, фільтруємо транзакції поточного користувача
      filteredTransactions = propTransactions.filter(
        (transaction) =>
          (transaction.from === user.email && transaction.type === "send") ||
          (transaction.to === user.email && transaction.type === "receive")
      );
    }

    setTransactions(filteredTransactions);
  }, [propTransactions, user, filter]);

  const timeElapsed = (timestamp) => {
    const now = Date.now();
    const diff = (now - new Date(timestamp).getTime()) / 1000;

    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minutes ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days} days ago`;
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div key={`${transaction.transactionId}-${index}`}>
              <Link to={`/transaction/${transaction.transactionId}`}>
                <div className="transaction-item">
                  <div className="transaction-logo">
                    <img
                      src={
                        transaction.isPending
                          ? transNotPending
                          : transaction.type === "send"
                          ? transSend
                          : transReceive
                      }
                      alt="transaction-logo"
                    />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">
                      <h6>
                        {transaction.type === "send"
                          ? `${transaction.type} to ${transaction.to}`
                          : `${transaction.type} from ${transaction.from}`}
                      </h6>
                    </div>
                    <div className="transaction-info">
                      <h6>
                        {transaction.isPending && (
                          <span className="unconfirmed">{"unconfirmed"} </span>
                        )}

                        <span>{transaction.timeElapsed}</span>
                      </h6>
                    </div>
                  </div>
                  <div>
                    <h4
                      className={`transaction-amount ${
                        transaction.isPending
                          ? "amount-grey"
                          : transaction.type === "send"
                          ? "amount-black"
                          : "amount-green"
                      }`}
                    >
                      {transaction.type === "send" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-no-transactions">
            <h3 className="text-no-transactions--title">
              Welcome to our cryptocurrency bank!
            </h3>
            <br />
            <h6 className="text-no-transactions--text">
              We are pleased to welcome you to the world of secure and
              innovative financial solutions. Although your balance currently
              shows no transactions, we look forward to helping you take full
              advantage of our services.
            </h6>
            <br />
            <h5>Our bank offers:</h5>
            <br />
            <h6 className="text-no-transactions--text">
              High level of security for your cryptocurrency Convenient and fast
              transactions Support for popular cryptocurrencies and fiat
              currencies Expert advice and 24/7 customer support Start your
              financial transactions with us today and discover new
              opportunities for yourself!
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
