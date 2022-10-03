import React, { useContext, useEffect, useState } from "react";
import ACTIONS from "../constants/constants";
import { Link } from "react-router-dom";
import { CardsContext } from "../context/CardsContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/wallet.css";
import CardWallet from "./CardWallet";
import Exchange from "./Exchange";
import { useNavigate } from "react-router-dom";
import eth from "../assets/ethereum.png"

function Wallet() {
  // destructure context - get user's NFT collections
  const { nftArr, dispatch } = useContext(CardsContext);

  // get current user status from AuthContext (checking cookies)
  const { status, user_id } = useContext(AuthContext);
  const navigate = useNavigate(); 
  
  const [balance, setBalance] = useState(0)
  // const [openExchange, setOpenExchange] = useState(false);

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

        // dispatch({ type: ACTIONS.LOAD_CARDS, payload: data });
        dispatch({ type: ACTIONS.LOAD_CARDS, payload: data.nftArr });
        setBalance(data.balance.money)
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
          <div>
            <span>Balance: {balance}</span>
            <Link to='/exchange'><p id="deposit">DEPOSIT</p></Link>
          </div>
        </div>
      </div>
      <h1>Collections</h1>
      <div className="user-nft">
        {nftArr.map((nft, index) => <CardWallet nft_id={nft.nft_id} key={index} src={nft.url} name={nft.name} status={nft.status} />)}
      </div>
    </div>
  );
}

export default Wallet;
