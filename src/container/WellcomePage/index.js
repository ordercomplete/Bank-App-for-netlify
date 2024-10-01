//Файл WellcomePage
import React from "react";
import { Link } from "react-router-dom";
import "../WellcomePage/style.css";

import settingsSvg from "../../IconsSvg/settings.svg";

export function WellcomePage() {
  return (
    <div className="welcome-container jost-font-text">
      <div className="welcome-background-container">
        <div className="wellcome-icons-block">
          <Link to="/settings-admin" className="welcome-settings-icon-link">
            <img src={settingsSvg} alt="Settings" />
          </Link>
        </div>

        <div className="welcome-heading-block">
          <div className="hello-text">Hello!</div>
          <h2 className="welcome-text">Welcome to bank app</h2>
          <h3 className="welcome-text-ticker">
            {/* Рухомий рядок */}
            <span className="marquee">
              The safest cryptobank is the guarantee of your peace of mind
            </span>
          </h3>
        </div>
      </div>
      <div className="welcome-image-box">
        <div className="welcome-image"></div>
      </div>
      <div className="wellcome-button-container navigation-bar">
        <Link to="/signup" className="register-button">
          Sign Up
        </Link>
        <Link to="/signin" className="login-button">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default WellcomePage;
