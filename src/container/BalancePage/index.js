// Файл BalancePage.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import TransactionList from "../../component/TransactionList";
import UsersBlock from "../../component/UsersBlock";
import TitleComponentBalance from "../../component/TitleComponentBalance";
import FilterSortComponent from "../../component/FilterSortComponent"; // імпортуємо новий компонент
import "./style.css";
import { calculateBalance } from "../../component/СalculateBalance";
import StatusBarColorChanger from "../../modul/StatusBarColorChanger";
import receiveButtonSvg from "../../IconsSvg/receive-button.svg";
import sendButtonSvg from "../../IconsSvg/send-button.svg";

export const BalancePage = () => {
  const { user, transactions, updateUserBalance } = useContext(AuthContext);
  const [filteredAndSortedTransactions, setFilteredAndSortedTransactions] =
    useState([]);

  useEffect(() => {
    if (user) {
      const newCalculatedBalance = calculateBalance(user.email, transactions);
      if (user.balance !== newCalculatedBalance) {
        updateUserBalance(newCalculatedBalance);
      }
    }
  }, [transactions, user, updateUserBalance]);

  return (
    <div className="balance-container jost-font-text">
      <StatusBarColorChanger color="#4380C5" />
      <div className="balance-background-container">
        <TitleComponentBalance />
        <h1 className="balance-amount">
          {user && typeof user.balance === "number"
            ? user.balance.toFixed(2)
            : "0.00"}
          $
        </h1>
      </div>
      <div className="balance-buttons-container">
        <Link to="/receive" className="receive-button">
          <img src={receiveButtonSvg} alt="Receive" />
          <h4>Receive</h4>
        </Link>
        <Link to="/send" className="send-button">
          <img src={sendButtonSvg} alt="Send" />
          <h4>Send</h4>
        </Link>
      </div>
      <FilterSortComponent
        transactions={transactions}
        setFilteredAndSortedTransactions={setFilteredAndSortedTransactions}
      />
      <div className="balance-TransactionList">
        <TransactionList transactions={filteredAndSortedTransactions} />
      </div>
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};
export default BalancePage;
