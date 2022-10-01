import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";

const SignIn = () => {
  const inputRef = useRef(null); // focus on first input field upon mounting
  const intialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(intialState);
  const { username, password } = formData;
  // const [errorMessage, setErrorMessage] = useState(null);  // set errorMessage if fails validation
  // const navigate = useNavigate();

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

  const handleSignIn = (e) => {
    e.preventDefault();

    // making post request to login user and redirect to homepage if successful
    // if false, generate error
    // if true, navigate('/homepoage') we have user's info and can make a GET reuqest to retrieve users' NFTs

    // navigate("/userwallet");
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
        {/* {errorMessage && <div className='error-message login'>{errorMessage}</div>} */}
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
