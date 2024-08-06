import React, { useEffect } from "react";

const StatusBarColorChanger2 = ({ color, targetClassName }) => {
  useEffect(() => {
    const updateColor = () => {
      const targetElements = document.querySelectorAll(`.${targetClassName}`);
      const metaTag = document.querySelector('meta[name="theme-color"]');
      if (metaTag) {
        if (targetElements.length > 0) {
          metaTag.setAttribute("content", color);
        } else {
          metaTag.removeAttribute("content");
        }
      }
    };

    // Initial call to set color
    updateColor();

    // Observer configuration
    const observerConfig = {
      childList: true,
      subtree: true,
    };

    // Observer to detect changes in the DOM
    const observer = new MutationObserver(() => {
      updateColor();
    });

    // Start observing the entire document for child changes to check if an element
    // with the target class is added or removed
    observer.observe(document.body, observerConfig);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [color, targetClassName]);

  return null;
};

export default StatusBarColorChanger2;

//Приклад використання компонента:

// jsx

// import React from 'react';
// import StatusBarColorChanger from './StatusBarColorChanger';

// const App = () => {
//   return (
//     <div className="default-container">
//       <StatusBarColorChanger color="#ff5722" targetClassName="default-container" />
//       {/* інший контент вашої сторінки */}
//     </div>
//   );
// };

// export default App;
// Пояснення
// Націлювання на елемент з класом: Компонент шукає всі елементи з класом, що відповідає targetClassName.
// Становлення кольору: Якщо елементи з цим класом присутні, встановлюється заданий колір статусбара. Якщо ні, атрибут content видаляється.
// Відстеження змін у DOM: Використовується MutationObserver для відстеження змін у всьому документі, щоб реагувати на можливу появу або зникнення елементів з цим класом.
