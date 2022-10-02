import React, { useContext, useEffect, useState } from "react";
import { CardsContext } from "../context/CardsContext";
import "../styles/wallet.css";
import Cardmp from "./Cardmp";

function Wallet() {
  // an array of retrieved NFTs as a state
  // const [walletArr, setWalletArr] = useState([]);

  // get current user from userContext (checking cookies)
  // have access to user_id, username

  //   useEffect(() => {
  //   after user successfully sign in, make a GET request to retrieve user's NFT inside useEffect(), pass user_id to back end => data received back will be an array of NFTs that belong to the users
  //   dispatch LOAD_CARD

  //   })

  // destructure context
  const { nftArr, dispatch } = useContext(CardsContext);

  const checkExistingCookie = () => {
    let cookieVal;
    const cookieArr = document.cookie.split("; ");
    // document.cookie = "favorite_food=tripe; SameSite=None;
    for (let i = 0; i < cookieArr.length; i++) {
      const cookie = cookieArr[i];
      const splitIndex = cookieArr.indexOf("=");
      if (cookie.slice(0, splitIndex) === "user_id") {
        cookieVal = cookie.slice(splitIndex + 1);
        break;
      }
    }
    return cookieVal;
  };
  // you need to be able to store the user_id from cookie right ? yea
  // so maybe loop thry cookieArr,
  // u can finish it for me
  // yo so do we need to invoke checkExistingCookie in useEffect?

  // user_id=123123123;
  useEffect(() => {
    console.log("inside useEffect");
    const cookieVal = checkExistingCookie();
    fetch(`/api/userinventory/${cookieVal}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOAD_CARDS, payload: data });
      });
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
        {nftArr.map((nft, index) => {
          <Cardmp src={nft.url} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Wallet;
