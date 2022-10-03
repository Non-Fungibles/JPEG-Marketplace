import React, { useContext } from "react";
import "../styles/card.css";

// User's NFT collection. Display SELL button
function CardWallet(props) {
  const { src, name } = props;
  
  return (
    <div className="card">
      <img src={src} alt="" />
      <span className="card-name">{name}</span>
      <br></br>
      <button className="sell-btn">Sell</button>
    </div>
  );
}


export default CardWallet;
