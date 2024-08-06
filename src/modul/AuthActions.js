// Файл AuthActions
// Генерування унікального ідентифікатора користувача на основі email. Функція приймає один параметр - email.
export const userIdGenerator = (email) => {
  // Отримати поточну дату у форматі ISO і видалити всі непотрібні символи, залишаючи лише цифри.
  const datePart = new Date().toISOString().replace(/\D/g, "");
  // Видалити з email всі символи, крім літер та цифр.
  const emailPart = email.replace(/[^a-zA-Z0-9]/g, "");
  // Повертати комбінацію з очищеного email та дати.
  return `${emailPart}_${datePart}`;
};

// Генерування унікального ідентифікатора транзакції на основі поточної дати і часу.
export const generateTransactionId = () => {
  // Отримати поточну дату у форматі ISO і видалити всі непотрібні символи, залишаючи лише цифри.
  return new Date().toISOString().replace(/\D/g, "");
};

// Генерування коду підтвердження, який складається з випадкових символів.
export const generateConfirmationCode = () => {
  // Генерувати випадкове число у вигляді рядка, перетворити його до бази 36, видаливши "0."
  return Math.random().toString(36).substring(2, 12);
};

// Реєстрація нового користувача. Приймає email, пароль, dispatch (для Redux).
export const registerUser = (email, password, dispatch) => {
  // Генерація коду підтвердження для нового користувача.
  const confirmationCode = generateConfirmationCode();

  // Створення об'єкта нового користувача з унікальним id, email, паролем, кодом підтвердження, статусом підтвердження і статусом адміна.
  const newUser = {
    id: userIdGenerator(email), // Використання userIdGenerator для створення унікального id.
    email, // Вказаний email користувача.
    password, // Вказаний пароль користувача. Зашифрування пароля не проводиться (практичне зауваження: рекомендується використовувати хешування паролів).
    confirmationCode, // Сгенерований код підтвердження.
    confirmed: false, // За замовчуванням користувач не підтверджений.
    isAdmin: email === "admin@admin", // Перевірка, чи є користувач адміністратором.
  };

  // Виклик dispatch для додавання нового користувача в систему (відправка події в Redux).
  dispatch({
    type: "REGISTER_USER", // Тип події для Redux (реєстрація користувача).
    payload: {
      newUser, // Параметр передачі нового користувача.
    },
  });

  // Виведення в консоль реєстрації нового користувача.
  console.log(`AuthActions: Registered new user: ${email}`);

  // Повернення результату реєстрації.
  return {
    success: true, // Ознака успішної реєстрації.
    message: "User successfully registered.", // Повідомлення про успіх.
    user: newUser, // Інформація про нового користувача.
  };
};

// Підтвердження користувача на основі email і коду підтвердження. Приймає email, confirmationCode, масив користувачів (users), dispatch (для Redux).
export const confirmUser = (email, confirmationCode, users, dispatch) => {
  // Пошук користувача в списку користувачів, що відповідає email і коду підтвердження.
  const user = users.find(
    (u) => u.email === email && u.confirmationCode === confirmationCode
  );

  // Якщо користувача знайдено
  if (user) {
    // Виклик dispatch для підтвердження користувача в системі (відправка події в Redux)
    dispatch({
      type: "CONFIRM_USER", // Тип події для Redux (підтвердження користувача)
      payload: { email, confirmationCode }, // Параметр передачі email і коду підтвердження
    });
    // Виведення в консоль успішного підтвердження користувача
    console.log(`User ${email} confirmed successfully.`);
    // Повернення успішного результату підтвердження
    return { success: true, message: "User confirmed successfully." };
  }

  // Якщо користувача не знайдено або код підтвердження невірний
  else {
    // Виведення в консоль невдалого підтвердження користувача
    console.log(`Failed to confirm user ${email}.`);
    // Повернення результату невдалого підтвердження
    return { success: false, message: "Invalid confirmation code." };
  }
};

// Оновлення пароля користувача. Приймає email, новий пароль (newPassword), dispatch (для Redux).
export const updatePassword = (email, newPassword, dispatch) => {
  // Виклик dispatch для оновлення пароля користувача в системі (відправка події в Redux)
  dispatch({
    type: "UPDATE_USER_PASSWORD", // Тип події для Redux (оновлення пароля користувача)
    payload: { email, newPassword }, // Параметри передачі email і нового пароля
  });

  // Виведення в консоль успішного оновлення пароля
  console.log(`Password for ${email} updated successfully.`);
  // Повернення результату успішного оновлення пароля
  return { success: true, message: "Password updated successfully." };
};

// Видалення акаунта користувача. Приймає об'єкт користувача (user), email, dispatch (для Redux) та поточного користувача (loggedInUser).
export const deleteAccount = (user, email, dispatch, loggedInUser) => {
  // Перевірка привілеїв на видалення акаунта (чи не є видаленням свого акаунта, чи поточний користувач є адміном)
  if (
    loggedInUser.email !== email && // Якщо це не свій акаунт
    !loggedInUser.isAdmin && // Якщо поточний користувач не є адміном
    email === user.email // Якщо email співпадає з email користувача
  ) {
    // Виведення в консоль відсутності привілеїв на видалення акаунта
    console.log("No privilege to delete the account.");
    // Повернення результату невдалого видалення акаунта через відсутність привілеїв
    return { success: false, message: "No privilege to delete the account." };
  }

  // Виклик dispatch для видалення акаунта користувача в системі (відправка події в Redux)
  dispatch({
    type: "REMOVE_USER", // Тип події для Redux (видалення користувача)
    payload: { email }, // Параметр передачі email
  });

  // Виведення в консоль успішного видалення акаунта
  console.log(`Account ${email} deleted.`);
  // Повернення результату успішного видалення акаунта
  return { success: true, message: "Account deleted successfully." };
};

// Функція видалення акаунта користувача для сторінки адміністратора. Приймає email і dispatch (для Redux).
export const deleteUserAccount = (email, dispatch) => {
  // Виклик dispatch для видалення акаунта користувача в системі (відправка події в Redux)
  dispatch({
    type: "REMOVE_USER", // Тип події для Redux (видалення користувача)
    payload: { email }, // Параметр передачі email
  });

  // Виведення в консоль успішного видалення акаунта
  console.log(`Account for ${email} has been deleted.`);
  // Повернення результату успішного видалення акаунта
  return {
    success: true, // Ознака успішного видалення
    message: `Account for ${email} has been deleted.`, // Повідомлення про успіх
  };
};

// Підтвердження транзакції на основі id транзакції. Приймає id транзакції (transactionId) і dispatch (для Redux).
export const confirmTransaction = (transactionId, dispatch) => {
  // Виклик dispatch для підтвердження транзакції в системі (відправка події в Redux)
  dispatch({
    type: "CONFIRM_TRANSACTION", // Тип події для Redux (підтвердження транзакції)
    payload: { transactionId }, // Параметр передачі id транзакції
  });

  // Виведення в консоль успішного підтвердження транзакції
  console.log(`Transaction ${transactionId} confirmed.`);

  // Повернення результату успішного підтвердження транзакції
  return {
    success: true, // Ознака успішного підтвердження
    message: `Transaction ${transactionId} confirmed.`, // Повідомлення про успіх
  };
};
