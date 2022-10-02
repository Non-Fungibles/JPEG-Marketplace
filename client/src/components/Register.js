import axios from 'axios';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css'
import ACTIONS from '../constants/constants';

const Register = () => {
  const inputRef = useRef(null);  // focus on first input field upon mounting
  const intialState = {
    username: '',
    password: '',
    password2: ''
  };
  
  const [formData, setFormData] = useState(intialState);
  const { username, password, password2 } = formData;
  const [errorMessage, setErrorMessage] = useState(null);  // set errorMessage if passwords do not match

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeForm = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorMessage('Password do not match');
      return;
    }
    // making post request to login user and redirect to Wallet
    axios.post('/api/users/signup', { username, password })
      .then(res => {
        // maybe use localStorage to store user so if user exit browser and come back, it still remember that user,
        localStorage.setItem('user', JSON.stringify(res.data.status));
        dispatch({ type: ACTIONS.LOGIN, payload: res.data.status })
        setFormData(intialState);
        navigate('/wallet');
      })
      .catch(err => {
        const error = err.response.data.message;
        setErrorMessage(error);
      })
  };

  return (
    <main>
      <form className='form' onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className='form-control'>
          <label htmlFor="username">Username</label>
          <input type="text" id='username' name='username' ref={inputRef} value={username} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" id='password2' name='password2' value={password2} onChange={handleChangeForm}/>
        </div>
        {errorMessage && <div className='error-message login'>{errorMessage}</div>}
        <button type='submit'>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/login'>Sign in</Link></div>
        <div id='copyright'>NFT Marketplace © 2022</div>
      </form>
    </main>
  );
};

export default Register;