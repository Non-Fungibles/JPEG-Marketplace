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
        // user_id: user_id,
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
        //  user_id : user_id
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
        // user_id: user_id,
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
    })
    .catch(err => console.log(err))
  }

  // useEffect(() =>{
  //   if(status !== forSale) {
      
  //   }
  // }, [status])
  
  return (
    <div className="card">
      <img src={src} alt="" />
      <span className="card-name">{name}</span>
      <br></br>
      {forSale && (
      <input type='text' id='price' name='price' value={priceForSale} onChange={(e) => setPriceForSale(e.target.value)} />
      )}
      {!status && <button onClick={() => sellHandler()} className="sell-btn">List For Sale</button>}
      {!status && <button onClick={() => setForSale(true)} className="sell-btn">Sell</button>}
      {status && <button className="sell-btn" onClick={removeMPhandler}>Remove from Market</button>}
      <button onClick={() => deleteNftHandler()} className="sell-btn">Delete</button>
    </div>
  );
}


export default CardWallet;
