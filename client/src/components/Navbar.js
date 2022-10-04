import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import axios from "axios";
import ACTIONS from "../constants/constants";
import eth from "../assets/ethereum.png"

const Navbar = () => {
  const { status, user_id, balance, dispatch } = useContext(AuthContext);
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
            <span id='user'>{balance}<img id="eth" src={eth}/></span>
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
