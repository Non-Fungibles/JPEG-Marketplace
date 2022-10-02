import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";
import ACTIONS from "../constants/constants";

const SignIn = () => {
  const inputRef = useRef(null); // focus on first input field upon mounting
  const intialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(intialState);
  const { username, password } = formData;
  const [errorMessage, setErrorMessage] = useState(null);  // set errorMessage if fails validation
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // add click handler to button 
  const handleSignIn = (e) => {
    e.preventDefault();

    // making POST request api/users/login, passing in { username, password }. If success redirect to Wallet. if false, generate error
    axios.post('/api/users/login', { username, password })
      .then(res => {        
        // if wrong username was entered, display error message 
        if (res.data.status === false) {
          setErrorMessage('Wrong password');
          return;
        }
        //  receive status = true from backend, then dispatch to change auth state
        localStorage.setItem('user', JSON.stringify(res.data.status));
        dispatch({ type: ACTIONS.LOGIN, payload: res.data.status })
        setFormData(intialState);
        navigate('/wallet');
      })
      .catch(err => {
        const error = err.response.data.err;
        setErrorMessage(error);
      })
  };

  return (
    <main>
      <form className="form" onSubmit={handleSignIn}>
        <h1>Sign in</h1>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={inputRef}
            value={username}
            onChange={handleChangeForm}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeForm}
          />
        </div>
        {errorMessage && <div className='error-message login'>{errorMessage}</div>}
        <button type="submit">SIGN IN</button>
        <div type="button" id="register">
          <Link to="/register">Don&apos;t have an account? Sign up</Link>
        </div>
        <div id="copyright">NFT Marketplace © 2022</div>
      </form>
    </main>
  );
};

export default SignIn;
