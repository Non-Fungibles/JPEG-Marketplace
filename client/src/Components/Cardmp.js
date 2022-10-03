import React, { useContext } from "react";
import "../styles/card.css";
import eth from "../assets/ethereum.png";
import { AuthContext } from "../context/AuthContext";
import ACTIONS from "../constants/constants";
import { CardsContext } from "../context/CardsContext";

// feature: everybody can see buy button, but if owner see REMOVE

function Cardmp(props) {
  const { src, name, price, nft_user_id, username, nft_id } = props;

  // get user_id from authContext, and display BUY button on Card if user_id !== nft_user_id
  const { user_id } = useContext(AuthContext);
  const { dispatch } = useContext(CardsContext);
  
  // clickHandler for buy-btn
  

  // clickHandler for remove-btn from 
  const removeMPhandler = () => {
    fetch("/api/cancelNFTfromMarketplace", {
      method: "PATCH",
      body: JSON.stringify({
        nft_id: nft_id,
        user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then((data) => {
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
        <img src={eth} id="eth" />
      </span>
      {username && <span className="owner">Owner: {username}</span>}
      
      {user_id !== nft_user_id ? (
        <button className="buy-btn">Buy now</button>
      ) : (
        <button onClick={() => removeMPhandler()} className="remove-btn">Remove</button>
      )}
    </div>
  );
}

export default Cardmp;
