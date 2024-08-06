import React, { useContext } from "react";
import TitleComponent from "../../component/TitleComponent";
import "../SettingsPageAdmin/style.css";
import { AuthContext } from "../../modul/AuthContext";
import Swal from "sweetalert2";

const pageTitle = "Settings Admin";

export const SettingsPageAdmin = () => {
  const { dispatch, user } = useContext(AuthContext);

  const handleClearUsers = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete all users except the administrator!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_USERS" });
        Swal.fire("Users deleted!", "", "success");
      }
    });
  };

  const handleClearTransactions = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete all transactions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_TRANSACTIONS" });
        Swal.fire("Transactions deleted!", "", "success");
      }
    });
  };

  const handleClearNotifications = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete all notifications!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_EVENTS" });
        Swal.fire("Notifications deleted!", "", "success");
      }
    });
  };

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />

      <div className="button-container">
        <button onClick={handleClearUsers} className="delete-button">
          Clear user list
        </button>

        <button onClick={handleClearTransactions} className="delete-button">
          Clear transaction list
        </button>
        <button onClick={handleClearNotifications} className="delete-button">
          Clear notifications
        </button>
      </div>
    </div>
  );
};

export default SettingsPageAdmin;
