import React from "react";
import "../styles/card.css";
import eth from "../assets/ethereum.png";

// feature: everybody can see buy button, but if owner see delete

function Cardmp(props) {
  const { src, name, price, user_id } = props;
  return (
    <div className="card">
      <img src={src} alt="" />
      <span>{name}</span>
      <br></br>
      <span>
        Price: {price}
        <img src={eth} id="eth" />
      </span>
      {/* <span>Owned By: {username}</span> */}
      <button className="buy-btn">Buy now</button>
    </div>
  );
}

export default Cardmp;
