import React, { useContext, useEffect, useState } from "react";
import ACTIONS from "../constants/constants";
import { CardsContext } from "../context/CardsContext";
import "../styles/wallet.css";
import Cardmp from "./Cardmp";

function Wallet() {
  // an array of retrieved NFTs as a state
  // const [walletArr, setWalletArr] = useState([]);

  // get current user from userContext (checking cookies)
  // have access to user_id, username
    
    // destructure context
    const { nftArr, dispatch } = useContext(CardsContext);
    // console.log('nftArr');
    // console.log(nftArr);
    
    //   after user successfully sign in, make a GET request to retrieve user's NFT inside useEffect(), pass user_id to back end => data received back will be an array of NFTs that belong to the users
  useEffect(() => {
    console.log("inside useEffect");
    fetch(`/api/users/userinventory/`)
      .then((res) => res.json())
      .then((data) => {
        console.log('inside fetch on the front end')

        // dummy data to test GET request 
        // data.push({
        //   NFT_id: 0,
        //   name: 'CryptoPunk #7376',
        //   price: 0,
        //   url: "https://img.seadn.io/files/03cf0db41d87259848c2d04c30837ff3.png?fit=max&w=2000",
        //   status: false,
        //   user_id: "Ray Kim"
        // },
        // {
        //   NFT_id: 1,
        //   name: 'CryptoPunk #7376',
        //   price: 0,
        //   url: "https://img.seadn.io/files/eff478e7644c71f95a13e94e43422f95.png?fit=max&w=2000",
        //   status: false,
        //   user_id: "Ray Kim"
        // })

        dispatch({ type: ACTIONS.LOAD_CARDS, payload: data });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="wallet">
      <h1>Wallet</h1>
      <div className="profile">
        <div id="banner">{/* <img src="" /> */}</div>
        <div id="pfp">
          <img src="https://i.seadn.io/gae/xurV3pY0m-T7W96hldO2EwX8UdeJiQq_6_pH8filWb2uGAqLKZs8oD4xMrTh8tdRQhq6dXOVojf8IZhvTWi5xfkltOTcffNYqY_zzw?auto=format&w=3840" />
          <span>Username{/* replace with username from res */}</span>
        </div>
      </div>
      <div className="user-nft">
        {nftArr.map((nft, index) => <Cardmp src={nft.url} key={index} />)}
      </div>
    </div>
  );
}

export default Wallet;
