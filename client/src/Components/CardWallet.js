import React, { useContext } from "react";
import "../styles/card.css";
import ACTIONS from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
import { CardsContext } from "../context/CardsContext";

// User's NFT collection. Display SELL button
function CardWallet(props) {
  const { src, name, nft_id } = props;
   const { user_id } = useContext(AuthContext);
   const { dispatch } = useContext(CardsContext);

  const deleteNftHandler = () => {
    fetch("/api", {
      method: 'DELETE',
      body: JSON.stringify({
         nft_id : nft_id,
         user_id : user_id
      }),
       headers: {
        "Content-Type": "application/json; charset=UTF-8"
         }
    })
    .then((res) => res.json())
    .then(data => {
      dispatch({type: ACTIONS.DELETE_CARD, payload: data})
    })
    .catch(err => console.log(err));
  }
  
  return (
    <div className="card">
      <img src={src} alt="" />
      <span className="card-name">{name}</span>
      <br></br>
      <button className="sell-btn">Sell</button>
      <button onClick={() => deleteNftHandler()} className="sell-btn">Delete</button>
    </div>
  );
}


export default CardWallet;
