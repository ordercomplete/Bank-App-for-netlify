import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import settingsSvg from "../../IconsSvg/settings.svg";
import bellRingingSvg from "../../IconsSvg/bell-ringing.svg";

const TitleComponentBalance = ({}) => {
  return (
    <div>
      <div className="balance-icons-block">
        <Link to="/settings" className="settings-icon-link">
          <img src={settingsSvg} alt="Settings" />
        </Link>

        <h3 className="balance-icon-title">Main wallet</h3>

        <Link to="/notifications" className="notifications-icon-link">
          <img src={bellRingingSvg} alt="Notifications" />
        </Link>
      </div>
    </div>
  );
};

export default TitleComponentBalance;
