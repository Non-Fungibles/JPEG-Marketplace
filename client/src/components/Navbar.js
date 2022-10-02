import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import axios from "axios";
import ACTIONS from "../constants/constants";

const Navbar = () => {
  const { status, user_id, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.delete('/api/users/logout')
      .then(res => {
        localStorage.removeItem('user');
        dispatch({ type: ACTIONS.LOGOUT, payload: res.data })
      })
      .catch(err => console.log(err));
    navigate('/');
  }

  // COMMENT: need backend to send back user_id on /login or /signup to display in navbar
  return (
    <div id="navbar">
      <div id="logo">
        <Link to="/">Logo</Link>
      </div>
      <div id="navigation">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/marketplace">Marketplace</Link>
        </span>
        <span>
          <Link to="/create">Create</Link>
        </span>
        <span>
          <Link to="/wallet">Wallet</Link>
        </span>
      </div>
      <div id="login-logout">
        {status ? (
          <>
            <span id='user'>USER ID: {user_id}</span>
            <button className="nav-btn" onClick={handleLogout}>LOG OUT</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="nav-btn">SIGN IN</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn">REGISTER</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
