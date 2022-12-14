import React, { useContext, useState, useEffect } from "react";
import "../styles/card.css";
import ACTIONS from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
import { CardsContext } from "../context/CardsContext";

// User's NFT collection. Display SELL button
function CardWallet(props) {
  const { src, name, nft_id, status } = props;
  const { user_id } = useContext(AuthContext);
  const { dispatch } = useContext(CardsContext);

  const [forSale, setForSale] = useState(false)
  const [priceForSale, setPriceForSale] = useState('');

   // clickHandler for remove-btn from mp
   const removeMPhandler = () => {
    fetch("/api/cancelNFTfromMarketplace", {
      method: "PATCH",
      body: JSON.stringify({
        nft_id: nft_id,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then((data) => {
      dispatch({ type: ACTIONS.UPDATE_CARD, payload: data })
    })
    .catch(err => console.log(err))
  }

  const deleteNftHandler = () => {
    fetch("/api", {
      method: 'DELETE',
      body: JSON.stringify({
         nft_id : nft_id,
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

  const sellHandler = () => {
    fetch("/api/sellNFTtoMarketplace", {
      method: 'PATCH',
      body: JSON.stringify({
        nft_id: nft_id,
        price: Number(priceForSale)
      }),
       headers: {
        "Content-Type": "application/json; charset=UTF-8"
         }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch({type: ACTIONS.SET_CARD_FOR_SALE, payload: data})
      setForSale(false);
    })
    .catch(err => console.log(err))
  }

  
  return (
    <div className="card">
      <img src={src} alt="" />
      <span className="card-name">{name}</span>
      <br></br>
      {forSale && (
        <div className="pop-up">
          <input type='text' id='price' name='price' value={priceForSale} onChange={(e) => setPriceForSale(e.target.value)} />
          <button className="pop-up-btn" onClick={() => setForSale(!forSale)}>Cancel</button>
          <button onClick={sellHandler} className="pop-up-btn" disabled={priceForSale.length === 0}>List For Sale</button>
        </div>
      )}
      
      {status ? 
      (<button className="remove-from-market" onClick={removeMPhandler}>Remove from Market</button>) : 
      (<button onClick={() => setForSale(true)} className="sell-btn">Sell</button>)}

      <button onClick={deleteNftHandler} className="sell-btn">Delete</button>
    </div>
  );
}


export default CardWallet;
