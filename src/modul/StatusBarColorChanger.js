import React, { useEffect } from "react";
//у випадку з Create React App, вам доведеться змінювати мета-теги динамічно за допомогою JavaScript залежно від активної сторінки.
// Ось простий приклад, як це можна зробити у React:
// Створіть окремий компонент для зміни кольору статусбару:
const StatusBarColorChanger = ({ color }) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute("content", color);
    }
  }, [color]);

  return null;
};

export default StatusBarColorChanger;

// Використовуйте цей компонент на кожній сторінці, де ви хочете змінити колір статусбару:
// import StatusBarColorChanger from './StatusBarColorChanger';

// const HomePage = () => {
//   return (
//     <div>
//       <StatusBarColorChanger color="#5E3CE2" />
//       <h1>Home Page</h1>
//     </div>
//   );
// };
//Потім у вашому маршрутизаторі (наприклад, react-router-dom) використовуйте ці компоненти:
//Таким чином, коли користувач буде переходити між сторінками, колір статусбару буде динамічно змінюватися відповідно до поточної сторінки.
