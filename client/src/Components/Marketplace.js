import React, { useEffect, useContext } from "react";
import { CardsContext } from "../context/CardsContext";
import Cardmp from "./Cardmp";
import { homeNfts } from "../data/storage";
import ACTIONS from "../constants/constants";
import "../styles/marketplace.css";

function Marketplace() {
  // NFT data schema: nft_id, name, price, url, status, user_id
  const { nftArr, dispatch } = useContext(CardsContext);

  // fetch data from backend endpoint where markets status is true
  useEffect(() => {
    fetch("/api/markets")
      .then((res) => res.json())
      .then((data) => {
        // filter out data we want to display (user, name of NFT, price)
        dispatch({ type: ACTIONS.LOAD_CARDS, payload: data });
      });
  }, []);

  //   const fetchData = () => {

  //   };
  // could invoke fetchData to constantly check for state change

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>
      {/* <div className="default-container"> */}
      <h2>Browse</h2>
      <div className="default-display">
        {homeNfts.map((nft, index) => (
          <Cardmp
            key={index}
            src={nft.url}
            name={nft.name}
            price={nft.price}
            username={nft.username}
          />
        ))}
      </div>
      <h2>On sale now!</h2>
      <div className="market-display">
        {nftArr.map((nft, index) => (
          <Cardmp
            key={index}
            src={nft.url}
            name={nft.name}
            price={nft.price}
            nft_user_id={nft.user_id}
            username={nft.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
