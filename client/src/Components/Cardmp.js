import React, { useContext } from "react";
import "../styles/card.css";
import eth from "../assets/ethereum.png";
import { AuthContext } from "../context/AuthContext";

// feature: everybody can see buy button, but if owner see REMOVE

function Cardmp(props) {
  const { src, name, price, nft_user_id, username } = props;

  // get user_id from authContext, and display BUY button on Card if user_id !== nft_user_id
  const { user_id } = useContext(AuthContext);
  

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
        <button className="remove-btn">Remove</button>
      )}
    </div>
  );
}

export default Cardmp;
