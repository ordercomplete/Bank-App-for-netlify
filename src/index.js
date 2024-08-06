//Файл render

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./normalize.css";
import "./index.css";

import App from "./App";

import StatusBarColorChanger from "./modul/StatusBarColorChanger";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <StatusBarColorChanger
      color="#8A6DE3"
      targetClassName="welcome-container"
    />
    <StatusBarColorChanger
      color="#4380C5"
      targetClassName="balance-container"
    />
    <StatusBarColorChanger
      color="#ffffff"
      targetClassName="default-container"
    />
    <StatusBarColorChanger
      color="#F5F5F7"
      targetClassName="default-container-auth"
    />
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// У цьому прикладі ми створили масив statusBarConfig, який містить об'єкти з необхідними конфігураціями для StatusBarColorChanger. Потім ми використовуємо метод map(), щоб створити масив компонентів StatusBarColorChanger на основі цього конфігураційного масиву. Це дозволяє нам скоротити код і зробити його більш читабельним.
// const statusBarConfig = [
//   {
//     color: "#8A6DE3",
//     targetClassName: "welcome-container",
//   },
//   {
//     color: "#4380C5",
//     targetClassName: "balance-container",
//   },
//   {
//     color: "#ffffff",
//     targetClassName: "default-container",
//   },
//   {
//     color: "#F5F5F7",
//     targetClassName: "default-container-auth",
//   },
// ];

// root.render(
//   <React.StrictMode>
//     {statusBarConfig.map((config) => (
//       <StatusBarColorChanger
//         color={config.color}
//         targetClassName={config.targetClassName}
//       />
//     ))}
//   </React.StrictMode>,
//   document.getElementById("root")
// );
