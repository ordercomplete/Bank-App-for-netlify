// Файл transactions.js (компонент)

export const updateUserBalance = (state, action) => {
  // const { updateUserBalanceForUser } = useContext(AuthContext);
  const transaction = action.payload; // Отримання об'єкта транзакції з дії
  let newState = {
    ...state, // Створення копії стану, щоб не змінювати оригінальний об'єкт
    transactions: [...state.transactions, transaction], // Додавання нової транзакції до масиву транзакцій
    users: state.users.map((user) => {
      // Модифікація користувачів відповідно до транзакції
      if (user.email === transaction.from) {
        return {
          ...user,
          balance: (user.balance || 0) - parseFloat(transaction.amount), // Віднімання суми транзакції від служби add-02.08.24
        };
      }
      if (
        transaction.paymentMethod === "Money Gram" &&
        user.email === transaction.to
      ) {
        return {
          ...user,
          balance: (user.balance || 0) + parseFloat(transaction.amount), // Додавання суми транзакції до балансу
        };
      }
      return user; // Повернення немодифікованого користувача в інших випадках
    }),
    pendingTransactions: state.pendingTransactions || [], // Ініціалізація або збереження масиву незавершених транзакцій
  };

  // Додавання транзакції до незавершених, якщо метод оплати "Western Union"
  if (transaction.paymentMethod === "Western Union") {
    newState.pendingTransactions = [
      ...(newState.pendingTransactions || []),
      transaction.transactionId,
    ];
  }

  console.log("Action ADD_TRANSACTION:", action, "New State:", newState); // Логування дії та нового стану
  return newState; // Повернення нового стану
};

// Експорт функції handleConfirmTransactionStatus для додатку
export const handleConfirmTransactionStatus = (state, action) => {
  const { transactionId } = action.payload; // Отримання ID транзакції з дії
  let newState = {
    ...state, // Створення копії стану
    transactions: state.transactions.map((t) =>
      t.transactionId === transactionId ? { ...t, isPending: false } : t
    ), // Зміна статусу транзакції на завершену
    users: state.users.map((user) => {
      const pendingTransaction = state.transactions.find(
        (t) => t.transactionId === transactionId
      ); // Знаходження транзакції по ID

      // Збільшення балансу отримувача
      if (user.email === pendingTransaction.to) {
        return {
          ...user,
          balance: (user.balance || 0) + parseFloat(pendingTransaction.amount),
        };
      }
      return user; // Повернення немодифікованого користувача в інших випадках
    }),
    pendingTransactions: (state.pendingTransactions || []).filter(
      (id) => id !== transactionId
    ), // Видалення ID транзакції з масиву незавершених транзакцій
  };

  console.log("Action CONFIRM_TRANSACTION:", action, "New State:", newState); // Логування дії та нового стану
  return newState; // Повернення нового стану
};
