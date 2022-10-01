import React from "react";

function Card(props) {
  const { src } = props;
  return (
    <div>
      <img src={src} alt="" />
    </div>
  );
}

export default Card;
