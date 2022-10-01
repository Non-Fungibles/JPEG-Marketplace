import React, { useEffect, useState } from "react";
import Card from "./Card";

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
    // setNftArr(homeNfts);
  };

  useEffect(() => {
    getNftsHome();
  }, []);

  return (
    <div>
      <h1>Hello from body</h1>
      {nftArr.map((url, index) => (
        <Card key={index} src={url} />
      ))}
    </div>
  );
}

export default Body;
