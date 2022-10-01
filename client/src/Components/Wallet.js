import React, { useEffect, useState } from "react";
import "../styles/wallet.css";

function Wallet() {
  // an array of retrieved NFTs as a state
  const [walletArr, setWalletArr] = useState([]);

  // useEffect(() => {
  // after user successfully sign in, make a GET request to retrieve user's NFT inside useEffect()

  // })
  return (
    <div className="wallet">
      <h1>Wallet</h1>
      <div className="profile">
        <div id="pfp">
          <img src="https://i.seadn.io/gae/xurV3pY0m-T7W96hldO2EwX8UdeJiQq_6_pH8filWb2uGAqLKZs8oD4xMrTh8tdRQhq6dXOVojf8IZhvTWi5xfkltOTcffNYqY_zzw?auto=format&w=3840" />
        </div>
        <div id="banner">
          <img src="" />
        </div>
      </div>
      <div className="user-nft">
        {/* {walletArr.map((url) => {
              Render Card component
          })} */}
      </div>
    </div>
  );
}

export default Wallet;
