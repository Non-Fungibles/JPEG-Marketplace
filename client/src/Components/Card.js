import React from "react";
import "../styles/card.css";

function Card(props) {
  const { src } = props;
  return (
    <div className="card">
      <img src={src} alt="" />
    </div>
  );
}

export default Card;
