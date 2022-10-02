import axios from 'axios';
import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';
import { AuthContext } from '../context/AuthContext';
import { CardsContext } from '../context/CardsContext';

// NFT structure: name, price, url, status, user_id
// Only pass { name, url } to the backend
// user_id will be id of user who create this NFT
// Default: price: 0, status: false, 

const CreateForm = () => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", url: "" });

  // Object destructuring
  const { name, url } = formData;

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Get current user who is logged in
  const { user_id } = useContext(AuthContext);
  const { dispatch } = useContext(CardsContext);
  const navigate = useNavigate();

  const handleChangeForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

  // COMMENT: price is a string, should it be a number?
  const handleCreateNFT = (e) => {
    e.preventDefault();
    axios.post('/api/add', { user_id, name, url })
      .then(res => {
        // received newly created NFT obj from backend, dispatch action to update state
        dispatch({ type: ACTIONS.CREATE_CARD, payload: res.data })
        // navigate back to user's Wallet after
        navigate('/wallet')
      })
  }

  return (
    <main id='createNFT'>
      <form className="form">
        <h1>Create New NFT</h1>
        <div className="form-control">
          <label htmlFor="name">Title</label>
          <input type="text" id='name' name='name' ref={inputRef} value={name} onChange={handleChangeForm}/>
        </div>
        <div className="form-control">
          <label htmlFor="url">URL</label>
          <input type="text" id='url' name='url' value={url} onChange={handleChangeForm} />
        </div>
        <button type='submit' onClick={handleCreateNFT}>CREATE</button>
      </form>
    </main>
  )
}

export default CreateForm