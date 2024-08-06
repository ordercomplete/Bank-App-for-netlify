// Файл UserNotificationsPage
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import UsersBlock from "../../component/UsersBlock";
import TitleComponent from "../../component/TitleComponent";
import CombinedEvents from "../../modul/CombinedEvents";

const UserNotificationsPage = () => {
  const { userId } = useParams();
  const { user, users, transactions, events } = useContext(AuthContext);
  // const [userEvents, setUserEvents] = useState([]);

  const currentUser = users.find((u) => u.id === userId);

  const userEvents = CombinedEvents({
    user: currentUser,
    transactions,
    events,
    // isAdmin: user.isAdmin, показує всі події
  });

  const pageTitle = "Notifications";

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />
      <h5>User: {currentUser.email}</h5>
      <div className="notifications-container">
        {userEvents.length > 0 ? (
          userEvents.map((event, index) => (
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

export default UserNotificationsPage;
