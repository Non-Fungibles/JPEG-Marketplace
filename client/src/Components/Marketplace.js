import React, { useEffect, useContext } from "react";
import { CardsContext } from "../context/CardsContext";
import Cardmp from "./Cardmp";
import { homeNfts, NFTsHero } from "../data/storage";
import ACTIONS from "../constants/constants";
import "../styles/marketplace.css";
import Sidebar from "./Sidebar";

function Marketplace() {
  // NFT data schema: nft_id, name, price, url, status, user_id
  const { nftArr, dispatch } = useContext(CardsContext);
  console.log(nftArr);  

  // fetch data from backend endpoint where markets status is true
  useEffect(() => {
    function getNFTsFromMarket() {
      fetch("/api/markets")
        .then((res) => res.json())
        .then((data) => {
          // filter out data we want to display (user, name of NFT, price)
          dispatch({ type: ACTIONS.LOAD_CARDS, payload: data });
        });
    }

    // fetch new data every 2s
    const intervalID = setInterval(getNFTsFromMarket, 2000);
    
    return () => clearInterval(intervalID);
  }, []);


  return (
    <div className="marketplace">
      <div className="mp-displays">
      <h1>Marketplace</h1>
        <h2>Browse</h2>
        <div className="default-display">
          {NFTsHero.map((nft, index) => (
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
        <div className="onsale">
            <Sidebar />
            <div className="market-display">
              {nftArr.map((nft, index) => (
              <Cardmp
                key={index}
                src={nft.url}
                name={nft.name}
                price={nft.price}
                nft_user_id={nft.user_id}
                username={nft.username}
                nft_id={nft.nft_id}
                timeLeft={nft.insert_time}
              />
          ))}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Marketplace;
