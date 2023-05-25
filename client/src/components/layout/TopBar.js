import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="sign-button button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="groupForm">
      <Link to="/groups">Make A Group</Link>
    </li>,
    <li key="profile">
      <Link to="/profile">Your Profile</Link>
    </li>,
    <li key="sign-out" className="sign-button">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-logo"><img src="https://i.imgur.com/HYVGKIK.png" /></li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
