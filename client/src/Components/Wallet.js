import React, { useContext, useEffect, useState } from "react";
import ACTIONS from "../constants/constants";
import { CardsContext } from "../context/CardsContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/wallet.css";
import CardWallet from "./CardWallet";
import { useNavigate } from "react-router-dom";

function Wallet() {
  // destructure context - get user's NFT collections
  const { nftArr, dispatch } = useContext(CardsContext);

  // get current user status from AuthContext (checking cookies)
  const { status, user_id } = useContext(AuthContext);
  const navigate = useNavigate();    

  //   after user successfully sign in, make a GET request to retrieve user's NFT inside useEffect(), pass user_id to back end => data received back will be an array of NFTs that belong to the users
  useEffect(() => {
    // if user tries to access Wallet w/o first logging in, redirect them to SignIn
    if (!status) {
      navigate('/login')
      return;
    }
    // otherwise, make a GET request to retrieve user's NFT collections
    fetch(`/api/users/userinventory/`)
      .then((res) => res.json())
      .then((data) => {
        // upon receiving data from backend, dispatch actions to update state
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
          <span>User ID: {user_id}</span>
        </div>
      </div>
      <h1>Collections</h1>
      <div className="user-nft">
        {nftArr.map((nft, index) => <CardWallet nft_id={nft.nft_id} key={index} src={nft.url} name={nft.name} />)}
      </div>
    </div>
  );
}

export default Wallet;
