//File TitleComponent
import React from "react";
import NavigationLink from "../NavigationLink";
import "./style.css";
// Replace with actual authentication state треба створити перевірку авторизації для кожної сторінки
const TitleComponent = ({ pageTitle, textUnderTitle, isAuthenticated }) => {
  return (
    <div className="title-block">
      <div className="title-flex-container">
        <div className="title-left-column">
          <NavigationLink />
        </div>

        <div className="title-center-column">
          <h2 className="title-name-page ">{pageTitle}</h2>
        </div>
        <div className="title-right-column"></div>
      </div>
      <h5 className="text-under-title">{textUnderTitle}</h5>
    </div>
  );
};

export default TitleComponent;
