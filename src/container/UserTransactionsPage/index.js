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
  const [hasNoMatchingFilter, setHasNoMatchingFilter] = useState(false);

  // Використовуємо useMemo для кешування об'єкта користувача
  const currentUser = React.useMemo(() => {
    return users.find((u) => u.id === userId);
  }, [userId, users]);

  // Використовуємо useMemo для кешування обчислень транзакцій
  const currentUserTransactions = React.useMemo(() => {
    if (!currentUser) return [];
    return transactions.filter(
      (transaction) =>
        (transaction.from === currentUser.email &&
          transaction.type === "send") ||
        (transaction.to === currentUser.email && transaction.type === "receive")
    );
  }, [currentUser, transactions]);

  // Оновлюємо транзакції при зміні userId або currentUserTransactions
  useEffect(() => {
    setFilteredAndSortedTransactions(currentUserTransactions);
    setHasNoMatchingFilter(false); // Скидаємо при зміні користувача
  }, [userId, currentUserTransactions]);

  const pageTitle = "Transactions"; // передати  заголовок

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />
      <h2>User {currentUser.email}</h2>
      <FilterSortComponent
        transactions={currentUserTransactions}
        setFilteredAndSortedTransactions={setFilteredAndSortedTransactions}
        hasNoMatchingFilter={hasNoMatchingFilter}
        setHasNoMatchingFilter={setHasNoMatchingFilter}
      />
      <TransactionList 
        transactions={filteredAndSortedTransactions} 
        hasNoMatchingFilter={hasNoMatchingFilter}
      />
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};

export default UserTransactionsPage;
