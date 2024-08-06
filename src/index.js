//Файл render

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./normalize.css";
import "./index.css";

import App from "./App";

import StatusBarColorChanger3 from "./modul/StatusBarColorChanger3";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <StatusBarColorChanger3
      color="#8A6DE3"
      targetClassName="welcome-container"
    />
    <StatusBarColorChanger3
      color="#4380C5"
      targetClassName="balance-container"
    />
    <StatusBarColorChanger3
      color="#ffffff"
      targetClassName="default-container"
    />
    <StatusBarColorChanger3
      color="#F5F5F7"
      targetClassName="default-container-auth"
    />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
