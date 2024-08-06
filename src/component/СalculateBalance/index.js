import React from "react";

//ми створили універсальну функцію calculateBalance і компонент CalculateBalance, які обчислюють баланс користувача на основі транзакцій. Цей функціонал тепер використовується як у UsersPage.js, так і у BalancePage.js, що значно покращує повторюваність коду та полегшує його читання та підтримку.

const calculateBalance = (userEmail, transactions) => {
  return transactions.reduce((balance, transaction) => {
    if (!transaction.isPending) {
      if (transaction.type === "receive" && transaction.to === userEmail) {
        return balance + parseFloat(transaction.amount);
      } else if (
        transaction.type === "send" &&
        transaction.from === userEmail
      ) {
        return balance - parseFloat(transaction.amount);
      }
    }
    return balance;
  }, 0);
};

const CalculateBalance = ({ userEmail, transactions }) => {
  const balance = calculateBalance(userEmail, transactions);
  return <>{balance.toFixed(2)}</>;
};

export { calculateBalance, CalculateBalance };
