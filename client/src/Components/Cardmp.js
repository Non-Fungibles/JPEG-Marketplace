import React, { useContext, useState } from "react";
import "../styles/card.css";
import eth from "../assets/ethereum.png";
import { AuthContext } from "../context/AuthContext";
import ACTIONS from "../constants/constants";
import { CardsContext } from "../context/CardsContext";
import { formatInTimeZone } from 'date-fns-tz';
import moment from "moment";

// feature: everybody can see buy button, but if owner see REMOVE

function Cardmp(props) {
  const { src, name, price, nft_user_id, username, nft_id, timeLeft } = props;

  // get user_id from authContext, and display BUY button on Card if user_id !== nft_user_id
  const { user_id, balance } = useContext(AuthContext);
  const authDispatch = useContext(AuthContext).dispatch;
  
  const { dispatch } = useContext(CardsContext);
  const [errorMessage, setErrorMessage] = useState('');
  
  // clickHandler for buy-btn
  const buyHandler = () => {
    // make sure user has enough money to buy this NFT
    if (Number(balance) < Number(price)) {
      setErrorMessage('Not enough money');
      retur
    }
    fetch("/api/buyNFTfromMarketplace", {
      method: "PATCH",
      body: JSON.stringify({
        nft_id: nft_id,
        // user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then((data) => {
      // filter out this nft from marketplace once it is bought by another user
      dispatch({ type: ACTIONS.DELETE_CARD, payload: data.nftData })
      
      // dispatch an action to update user's balance
      authDispatch({ type: ACTIONS.UPDATE_BALANCE, payload: data.balance })
    })
    .catch(err => console.log(err))
  }

  // clickHandler for remove-btn from mp
  const removeMPhandler = () => {
    fetch("/api/cancelNFTfromMarketplace/", {
      method: "PATCH",
      body: JSON.stringify({
        nft_id: nft_id,
        // user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then((data) => {
      // users remove their own nft from marketplace
      dispatch({ type: ACTIONS.DELETE_CARD, payload: data })
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="card">
      <img src={src} alt="" />
      <span className="card-name">{name}</span>
      <br></br>
      <span>
        Price: {price}
        <img src={eth} id="eth-card" />
      </span>
      {username && <span className="owner">Owner: {username}</span>}
      
      {user_id !== nft_user_id ? (
        <button onClick={() => buyHandler()} className="buy-btn">Buy now</button>
      ) : (
        <button onClick={() => removeMPhandler()} className="remove-btn">Remove</button>
      )}
      {errorMessage && <span>{errorMessage}</span>}
      {timeLeft && <span id='time'>{moment(timeLeft).fromNow()}</span>}
    </div>
  );
}

export default Cardmp;
