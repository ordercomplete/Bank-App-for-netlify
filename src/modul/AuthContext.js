// Файл AuthContext
// Цей файл відповідає за контекст аутентифікації в додатку. Він зберігає та керує станом аутентифікації користувачів.

import React, { createContext, useReducer, useEffect, useState } from "react";
// Імпорт бібліотек React, createContext, useReducer та useEffect.

import {
  // handleAddTransaction,
  updateUserBalance,
  handleConfirmTransactionStatus,
} from "./Transactions";
// Імпорт функцій для обробки транзакцій з файлу transactions.js.

export const AuthContext = createContext();
// Створюємо та експортуємо контекст AuthContext.

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  users: [...(JSON.parse(localStorage.getItem("users")) || [])],
  // Ініціалізуємо масив користувачів з localStorage, або пустий масив, якщо даних нема.
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  // Ініціалізуємо масив транзакцій з localStorage, або пустий масив, якщо даних нема.
  events: [], // Масив подій, які відбувались у додатку.
  // pendingTransactions: [], // add 25.07.24 // Закоментована частина для можливого додавання в майбутньому.
};

const loadStateFromLocalStorage = () => {
  // Функція для завантаження стану з localStorage.
  const defaultState = {
    token: null,
    user: null,
    isLoggedIn: false,
    users: [...(JSON.parse(localStorage.getItem("users")) || [])],
    transactions: [],
    events: [],
    pendingTransactions: [],
  };
  // Ініціалізація стану за замовчуванням.

  try {
    const storedState = JSON.parse(localStorage.getItem("authState")) || {};
    // Завантаження стану з localStorage або порожній об'єкт.
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    // Завантаження транзакцій з localStorage або порожній масив.

    const loadedState = {
      ...defaultState,
      ...storedState,
      transactions: storedTransactions,
      pendingTransactions: storedState.pendingTransactions || [],
    };
    // Об'єднання стану за замовчуванням з завантаженим станом та транзакціями.

    console.log("Loaded state from localStorage:", loadedState);
    // Виведення завантаженого стану до консолі для діагностики.
    return loadedState;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    // Виведення помилки до консолі у разі невдачі при завантаженні стану.
  }
  return initialState;
  // Повернення початкового стану у разі помилки.
};

const saveStateToLocalStorage = (state) => {
  // Функція для збереження стану в localStorage.
  try {
    localStorage.setItem(
      "authState",
      JSON.stringify({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        users: state.users,
        events: state.events,
        pendingTransactions: state.pendingTransactions,
      })
    );
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
    console.log("State saved to localStorage:", state);
    // Збереження стану в localStorage та виведення стану до консолі для діагностики.
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
    // Виведення помилки до консолі у разі невдачі при збереженні стану.
  }
};

export const reducer = (state, action) => {
  // Ред'юсер для обробки дій, викликаних в додатку.
  let newState;

  console.log("Current State:", state);
  console.log("Action Received:", action);
  // Виведення поточного стану та дії до консолі для діагностики.

  switch (action.type) {
    // case "INIT_STATE":
    //   return { ...state, ...action.payload };

    case "LOGIN":
      const loginEvent = {
        title: "Login",
        info: `User login ${
          action.payload.user.email
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.user.email,
      };
      newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
        events: [...state.events, loginEvent],
        // Оновлюємо стан: зберігаємо токен та користувача, помічаємо, що користувач увійшов,
        // додаємо подію входу до списку подій.
      };
      break;

    case "LOGOUT":
      // Дія для виходу користувача з аккаунту.
      const logoutEvent = {
        title: "Logout",
        info: `User logout ${
          state.user ? state.user.email : ""
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: state.user ? state.user.email : "",
        // Створення події виходу з аккаунту.
      };
      newState = {
        ...initialState,
        users: state.users,
        transactions: state.transactions,
        pendingTransactions: state.pendingTransactions,
        events: [...state.events, logoutEvent],
        // Повертаємо стан до початкового, зберігаючи користувачів, транзакції, непідтверджені транзакції
        // та додаючи подію виходу.
      };
      console.log("Action LOGOUT:", action, "New State:", newState);
      break;

    case "REGISTER_USER":
      // Дія для реєстрації нового користувача.
      const newUser = {
        title: "User registration",
        info: `User created ${
          action.payload.newUser.email
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        ...action.payload.newUser,
        confirmed: action.payload.newUser.confirmed || false,
        confirmationCode: action.payload.newUser.confirmationCode || "",
        user: action.payload.newUser.email,
        // Створення події реєстрації користувача.
      };

      newState = {
        ...state,
        users: [...state.users, action.payload.newUser],
        events: [...state.events, newUser],
        // Додаємо нового користувача до списку користувачів та додаємо подію реєстрації.
      };
      console.log("Action REGISTER_USER:", action, "New State:", newState);
      break;

    case "REMOVE_USER":
      // Дія для видалення користувача.
      const removeEvent = {
        title: "Account deletion",
        info: `User deleted ${
          state.user ? state.user.email : ""
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.email,
        // Створення події видалення користувача.
      };
      newState = {
        ...state,
        users: state.users.filter(
          (user) => user.email !== action.payload.email
        ),
        events: [...state.events, removeEvent],
        // Видаляємо користувача зі списку користувачів та додаємо подію видалення.
      };
      console.log("Action REMOVE_USER:", action, "New State:", newState);
      break;

    case "UPDATE_USER_EMAIL":
      // Дія для оновлення електронної пошти користувача.
      const updateUserEmailEvent = {
        title: "Change of mail",
        info: `Changed the user's mail ${action.payload.oldEmail} на ${
          action.payload.newEmail
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.oldEmail,
        // Створення події зміни пошти.
      };
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.oldEmail
            ? { ...user, email: action.payload.newEmail }
            : user
        ),
        events: [...state.events, updateUserEmailEvent],
        // Оновлюємо пошту користувача у списку користувачів та додаємо подію зміни пошти.
      };
      console.log("Action UPDATE_USER_EMAIL:", action, "New State:", newState);
      break;

    case "UPDATE_USER_PASSWORD":
      // Дія для оновлення пароля користувача.
      const updateUserPasswordEvent = {
        title: "Password change",
        info: `Changed user password ${action.payload.oldPassword} на ${
          action.payload.newPassword
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.email,

        // Створення події зміни пароля.
      };
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, password: action.payload.newPassword }
            : user
        ),
        events: [...state.events, updateUserPasswordEvent],
        // Оновлюємо пароль користувача у списку користувачів та додаємо подію зміни пароля.
      };
      console.log(
        "Action UPDATE_USER_PASSWORD:",
        action,
        "New State:",
        newState
      );
      break;

    case "CONFIRM_USER":
      // Дія для підтвердження користувача.
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, confirmed: true, confirmationCode: "" }
            : user
        ),
        // Оновлюємо статус підтвердження користувача у списку користувачів.
      };
      console.log("Action CONFIRM_USER:", action, "New State:", newState);
      break;

    case "ADD_TRANSACTION":
      // Дія для додавання транзакції.
      newState = updateUserBalance(state, action);
      // Використовуємо функцію handleAddTransaction для обробки додавання транзакції.
      break;

    case "CONFIRM_TRANSACTION":
      // Дія для підтвердження транзакції.
      newState = handleConfirmTransactionStatus(state, action);
      // Використовуємо функцію handleConfirmTransactionStatus для обробки підтвердження транзакції.
      break;

    case "CLEAR_TRANSACTIONS":
      // Дія для очищення всіх транзакцій.
      newState = {
        ...state,
        transactions: [],
        pendingTransactions: [],
        // Очищаємо масиви транзакцій та непідтверджених транзакцій.
      };
      console.log(
        "Action CLEAR_TRANSACTIONS: Cleared all transactions",
        newState
      );
      break;

    case "CLEAR_EVENTS":
      // Дія для очищення всіх подій.
      newState = {
        ...state,
        events: [],
        combinedEvents: [],
        // Очищаємо масив подій.
      };
      console.log(
        "Action CLEAR_EVENTS:",
        action,
        "Cleared all events",
        newState
      );
      break;

    case "CLEAR_USERS":
      // Дія для очищення всіх користувачів, крім адміністратора.
      const adminUser = state.users.find((user) => user.isAdmin);
      newState = {
        ...state,
        users: adminUser ? [adminUser] : [],
        // Залишаємо тільки адміністратора у списку користувачів.
      };
      console.log(
        "Action CLEAR_USERS:",
        action,
        "Cleared all users except admin",
        newState
      );
      break;

    case "UPDATE_USER_BALANCE":
      newState = {
        ...state,
        user: {
          ...state.user,
          balance: action.payload,
        },
      };
      break;

    default:
      newState = state;
      console.log("Unhandled action type:", action);
    // За замовчуванням повертаємо поточний стан для будь-яких невідомих дій.
  }

  saveStateToLocalStorage(newState);
  // Зберігаємо новий стан у localStorage.

  console.log("New State after saving to localStorage:", newState);
  // Виведення нового стану після збереження у localStorage до консолі для діагностики.
  return newState;
};

export const AuthProvider = ({ children }) => {
  // Компонент AuthProvider, який надає контекст аутентифікації всім дочірнім компонентам.

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    loadStateFromLocalStorage
  );

  // Використовуємо хук useReducer для управління станом з ред'юсером та початковим станом,
  // завантажуємо стан з localStorage при ініціалізації.

  useEffect(() => {
    saveStateToLocalStorage(state);
    console.log("AuthProvider State: ", state);
    // Використовуємо хук useEffect для збереження стану у localStorage при кожній його зміні та виведення до консолі.
  }, [state]);

  const updateUserBalance = (newBalance) => {
    dispatch({ type: "UPDATE_USER_BALANCE", payload: newBalance });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        // updateUserBalanceForUser,
        updateUserBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
    // Надаємо контекст з поточним станом та функцією dispatch для обробки дій всім дочірнім компонентам.
  );
};

export default AuthProvider;
// Експортуємо компонент AuthProvider за замовчуванням.
