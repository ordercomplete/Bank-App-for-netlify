import React, { useEffect } from "react";

const StatusBarColorChanger3 = ({ targetClassName, color }) => {
  useEffect(() => {
    const updateStatusBarColor = () => {
      const targetElements = document.querySelectorAll(`.${targetClassName}`);
      const metaTag = document.querySelector('meta[name="theme-color"]');

      if (targetElements.length > 0) {
        if (metaTag) {
          metaTag.setAttribute("content", color);
        } else {
          const newMetaTag = document.createElement("meta");
          newMetaTag.setAttribute("name", "theme-color");
          newMetaTag.setAttribute("content", color);
          document.head.appendChild(newMetaTag);
        }
      }
    };

    // Викликаємо під час компонування компонента
    updateStatusBarColor();

    // Відстеження змін у DOM
    const observerConfig = {
      childList: true,
      subtree: true,
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          updateStatusBarColor();
        }
      }
    });

    observer.observe(document.body, observerConfig);

    // Прибрана зміна кольору на демонтуження компонента
    return () => {
      observer.disconnect();
    };
  }, [targetClassName, color]);

  return null;
};

export default StatusBarColorChanger3;

//Пояснення
// Компонент StatusBarColorChanger: Він створює та використовує MutationObserver для відстеження змін в DOM, щоб перевіряти наявність елементів з класом welcome-container. Якщо такі елементи є, змінює колір статусбара.
// Статус бар метатег: Якщо метатег theme-color вже існує, його атрибут content змінюється на вказаний колір. Якщо метатег відсутній, він буде створений.
// Централізоване підключення: Компонент підключено в кореневому файлі index.js або в основному компоненті, і він впливає на всі сторінки, де є елементи з класом welcome-container.
// Таким чином, ви отримуєте бажаний результат, коли зміна кольору статусбара централізовано контролюється з одного місця і застосовується до всіх сторінок, що містять елементи з потрібним класом.
