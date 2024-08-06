//Файл NotificationsPage.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../modul/AuthContext";
import UsersBlock from "../../component/UsersBlock";
import TitleComponent from "../../component/TitleComponent";
import CombinedEvents from "../../modul/CombinedEvents";
import "./style.css";

export const NotificationsPage = () => {
  const { user, transactions, events } = useContext(AuthContext);
  // const [allEvents, setAllEvents] = useState([]);
  const allEvents = CombinedEvents({
    user,
    transactions,
    events,
    isAdmin: user.isAdmin,
  });

  const isAuthenticated = true;
  const pageTitle = "Notifications";

  return (
    <div className="default-container-auth">
      <TitleComponent pageTitle={pageTitle} isAuthenticated={isAuthenticated} />

      <div className="notifications-container">
        {allEvents.length > 0 ? (
          allEvents.map((event, index) => (
            <div
              key={index}
              className={`notification-item notification-${event.type}`}
            >
              <div className="notification-logo">
                <img
                  src={`/eventIcons/${
                    event.type === "transaction"
                      ? "event.svg"
                      : "event-warn.svg"
                  }`}
                  alt="Event logo"
                />
              </div>
              <div className="notification-details">
                <h3 className="notification-title">{event.title}</h3>
                <h4 className="notification-info">{event.info}</h4>
              </div>
            </div>
          ))
        ) : (
          <p>
            Here you will see all the events of your account, such as
            transactions, logins and exits from the account, change of email and
            password.
          </p>
        )}
      </div>
      <div className="UsersBlockSpace">
        <UsersBlock user={user} />
      </div>
    </div>
  );
};

export default NotificationsPage;
