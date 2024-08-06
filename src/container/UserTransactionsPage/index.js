// Файл UserTransactionsPage.js
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import TransactionList from "../../component/TransactionList";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";
import FilterSortComponent from "../../component/FilterSortComponent"; // імпортуємо новий компонент

const UserTransactionsPage = () => {
  const { userId } = useParams();
  const { user, users, transactions } = useContext(AuthContext);
  const [filteredAndSortedTransactions, setFilteredAndSortedTransactions] =
    useState([]);

  const currentUser = users.find((u) => u.id === userId);

  let currentUserTransactions = [];
  if (currentUser) {
    currentUserTransactions = transactions.filter(
      (transaction) =>
        (transaction.from === currentUser.email &&
          transaction.type === "send") ||
        (transaction.to === currentUser.email && transaction.type === "receive")
    );
  }

  useEffect(() => {
    setFilteredAndSortedTransactions(currentUserTransactions);
  }, [transactions]);

  const pageTitle = "Transactions"; // передати  заголовок

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />
      <h5>User {currentUser.email}</h5>
      <FilterSortComponent
        transactions={currentUserTransactions}
        setFilteredAndSortedTransactions={setFilteredAndSortedTransactions}
      />
      <TransactionList transactions={filteredAndSortedTransactions} />
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};

export default UserTransactionsPage;
