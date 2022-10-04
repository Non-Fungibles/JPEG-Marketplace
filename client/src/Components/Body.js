import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/body.css";


function Body() {
  // arr to store initial nfts displayed on home render
  const homeNfts = [
    "https://img.seadn.io/files/03cf0db41d87259848c2d04c30837ff3.png?fit=max&w=2000",
    "https://img.seadn.io/files/eff478e7644c71f95a13e94e43422f95.png?fit=max&w=2000",
    "https://img.seadn.io/files/cf294ddf1d506d828dce07d4126ffc1a.png?fit=max&w=2000",
    "https://img.seadn.io/files/ff55bdc0e9a44f55dd5046f0b632983f.png?fit=max&w=2000",
    "https://img.seadn.io/files/37d9971ad38fc91be4423f58ed3244d0.png?fit=max&w=2000",
    "https://img.seadn.io/files/7c21b04a0b0e797faea838d7464f6a2e.png?fit=max&w=2000",
    "https://img.seadn.io/files/a88feeb202cc217ff20d8c164e05fb0b.png?fit=max&w=2000",
    "https://img.seadn.io/files/d0436c5651fda70ba89eaf779735e104.png?fit=max&w=2000",
    "https://img.seadn.io/files/1c2d56012acc4db270819ac0acb8c63c.png?fit=max&w=2000",
    "https://img.seadn.io/files/a930f3a4526dbe0fc90c6d31131cf995.png?fit=max&w=2000",
    "https://img.seadn.io/files/5c8e110bc53e8008f6d78c3d1c0b90ef.png?fit=max&w=2000",
    "https://img.seadn.io/files/bff909bb0d0b1a2237c799c114db4ce8.png?fit=max&w=2000",
    "https://img.seadn.io/files/2aa5acf4692942ce9d1800a01097b228.png?fit=max&w=2000",
    "https://img.seadn.io/files/923bc4eb1adf0142bb48133d47411e88.png?fit=max&w=2000",
    "https://img.seadn.io/files/dbc8fa963402e5a5bed422086d88862a.png?fit=max&w=2000",
    "https://img.seadn.io/files/a8f558b2e2196c57ad17c9ef085a7729.png?fit=max&w=2000",
    "https://img.seadn.io/files/deb5921932241274b77f2acb0eeb9108.png?fit=max&w=2000",
    "https://img.seadn.io/files/c3af547bf9c7cfff8eb0be5303623cb7.png?fit=max&w=2000",
    "https://img.seadn.io/files/7956f6ae0371335b0dfcf5fca5ced20c.png?fit=max&w=2000",
    "https://img.seadn.io/files/bb086bf001dd12e70d4e0fea53f9e0a8.png?fit=max&w=2000",
    "https://img.seadn.io/files/060dc367e3c22dbf361d207d4d7018fe.png?fit=max&w=2000",
    "https://img.seadn.io/files/10443620928bc6dffec46563a935aa2d.png?fit=max&w=2000",
    "https://img.seadn.io/files/5cb293e114b4c1314e34d9bb4d87e620.png?fit=max&w=2000",
    "https://api.mooncat.community/image/0x0076e7cc93",
    "https://api.mooncat.community/image/0x00d658d50b",
    "https://img.seadn.io/files/698a145bd3c856e79ca99e7b816ee654.png?fit=max&w=2000",
    "https://img.seadn.io/files/620ffcbb6067836370ce3ca273b4ce09.png?fit=max&w=2000",
    "https://img.seadn.io/files/2a04c47bd1b91c807130b9a9d47380d9.png?fit=max&w=2000",
    "https://img.seadn.io/files/1d7cf7614dd5d4b5a39ef2987ed628d4.png?fit=max&w=2000",
    "https://i.seadn.io/gae/OWEBln_pSK0NIcvFAKNpqvU4TFxNTkDBAeuIWmBwSY1mpd-JN-ICzBxcZe1cQMJmyoBWjYvAuF20YgOgFtiYgOAqyuk5YutzUdxBgQ?auto=format&w=1000"
  ];

  // useState hook to deconstructure
  const [nftArr, setNftArr] = useState(homeNfts);

  // function for shuffling homeNfts arr
  const shuffleArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * (arr.length - 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const getNftsHome = () => {
    setNftArr(shuffleArr(homeNfts));
  };

  useEffect(() => {
    getNftsHome();
  }, [nftArr]);

  return (
    <div className="body">
      {nftArr.map((url, index) => (
        <Card key={index} src={url} />
      ))}
    </div>
  );
}

export default Body;
