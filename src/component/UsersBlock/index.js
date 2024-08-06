//file UsersBlock
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import users_black from "../../IconsSvg/users_black.svg";

export const UsersBlock = ({ user }) => {
  const isAdmin = user && user.email === "admin@admin" && user.isAdmin;
  return (
    <div className={`users-block ${isAdmin ? "" : "non-admin"}`}>
      <h6 className="current-user">
        <span>{user ? `${user.email}` : "Guest"}</span>
      </h6>

      <h4 className="userslist">
        {isAdmin && (
          <Link to="/users" className="users-icon-link">
            <img className="icon-enter" src={users_black} alt="icon-enter" />
          </Link>
        )}
      </h4>
    </div>
  );
};

export default UsersBlock;
