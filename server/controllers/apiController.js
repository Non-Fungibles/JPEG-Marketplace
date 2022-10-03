const db = require('../models/dbModels');

const apiController = {};

//middleware for getting NFT's on the marketplace
apiController.getMarket = (req, res, next) => {
  //SELECT nfts.*, users.username AS username FROM nfts WHERE nfts.status = true INNER JOIN users ON nfts.user_id = users.user_id
  const queryString = `
  SELECT nfts.*, users.username AS username 
  FROM nfts 
  INNER JOIN users 
  ON nfts.user_id = users.user_id
  WHERE nfts.status = true `;
  db.query(queryString)
    .then((result) => {
      res.locals.marketData = result.rows;
      next();
    })
    .catch((err) => {
      return next({
        err: 'error in apiController.getMarket error retrieving marketdata',
        status: 500,
        message: { err: 'error in apiController.getMarket' },
      });
    });
};

//get user's own NFT list
apiController.getNFTsforOneUser = async (req, res, next) => {
  const user_id = Number(req.cookies.user_id); // use req.cookies to get user_id instead of req.params
  //  const { user_id } = req.body;
  const param = [user_id];

  try {
    const selectQueryfromSameUser = `
    SELECT * FROM nfts WHERE user_id = $1 
  `;

    const inventoryForOneUser = await db.query(selectQueryfromSameUser, param);
    res.locals.inventoryForOneUser = inventoryForOneUser.rows;  
    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.getNFTsforOneUser middleware',
      status: 400,
      message: {
        err: `apiController.getNFTsforOneUser: ERROR: ${error}`,
      },
    });
  }
};

//buyNFT
apiController.buyNFTfromMarketplace = (req, res, next) => {
  //user_id = buyer id
   const user_id = Number(req.cookies.user_id)
  const { nft_id } = req.body;
  const param = [nft_id, user_id];
  let nftData = {};
  let buyerData = {};
  //checks to see if the nft in question is for sale
  const queryString = `
    SELECT * FROM nfts WHERE nft_id = $1 AND status = true
    `;
  db.query(queryString, [nft_id]).then((data) => {
    if (!data) {
      return next({
        log: 'Express error in apiController.buyNFTfromMarketplace middleware',
        message: { err: 'NFT is not for sale or does not exist' },
      });
    }
    nftData = data.rows[0];
    //console.log(nftData);
    res.locals.nftData = nftData;
    //if we reach here the nft is for sale
    db.query('SELECT * FROM users WHERE user_id = $1', [user_id]).then(
      (response) => {
        buyerData = response.rows[0];
        //console.log(buyerData);
        res.locals.buyerData = buyerData;
        //checks if the buyer has enough money to buy the nft
        if (Number(buyerData.money) >= Number(nftData.price)) {
          //change the ownership of nft to the buyer
          const updateQueryString = `UPDATE nfts SET user_id = $2, status = false WHERE nft_id = $1 RETURNING *`;
          db.query(updateQueryString, param).then((data) => {
            res.locals.updatedNFT = data.rows[0];
            return next();
          });
        } else {
          return next({
            log: 'not enough money backend',
            message: { err: 'Buyer does not have enough money' },
          });
        }
      }
    );
  });
};

apiController.exchangeMoney = (req, res, next) => {
  const { money, user_id } = res.locals.buyerData;
  const { price } = res.locals.nftData;
  const seller_id = res.locals.nftData.user_id;
  let newBalance = money - price;
  const param = [user_id,newBalance];

   //update the new balance for the buyer in the DB
  const newBalanceBuyerQuery = `
    UPDATE users 
    SET money = $2
    WHERE user_id = $1 
    RETURNING *
  `;
  // update the new balance for the seller in the DB
  const newBalanceSellerQuery = `
  UPDATE users
  SET money = money + ${price} 
  Where user_id = $1
  
  `;
  db.query(newBalanceBuyerQuery,param)
    .then((data)=> {
      //returning the new balance for the buyer to frontend
      res.locals.balance = data.rows[0].money;
      db.query(newBalanceSellerQuery, [seller_id])
      .then(data => next())
    })
};
//subtract money from the buyer
//increase the seller's money
//return the updated object
//seller.user.id, money,   buyer.user.id,money

// Update NFT, return a new updated NFT object to frontend
apiController.sellNFTtoMarketplace = async (req, res, next) => {
  //this is where we set the status of said nft to true;
  const user_id = Number(req.cookies.user_id)
  const { nft_id, price} = req.body; //user should be an object from frontend
  // const {user_id} = req.cookie.user_id;
  const param = [nft_id, user_id, price];
  //req.cookie.username=username of the person logged it
  // if (user_id !== req.cookies.user_id) {
  //   return next({ status: false, message: 'wrong user' });
  // }
  try { 
    //change the status for NFTs so it will be on markelplace for sale
    const sellQuery = `UPDATE nfts 
    SET status = true, price = $3 
    WHERE nft_id = $1 AND user_id = $2 
    RETURNING *`;
    //check if user_id is equal to res.cookie.user_id
    const updatedNFTowner = await db.query(sellQuery, param);
    //console.log(updatedNFTowner.rows[0].nft_id)
    res.locals.nftData = updatedNFTowner.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.sellNFTtoMarketplace middleware',
      status: 400,
      message: {
        err: `apiController.sellNFTtoMarketplace: ERROR: ${error}`,
      },
    });
  }
};

apiController.stopSellNFT = async (req, res, next) => {
  //this is where we set the status of said NFT to false
  const user_id = Number (req.cookies.user_id)
  const { nft_id } = req.body; //user should be an object from frontend
  // const {user_id} = req.cookie.user_id;
  const param = [nft_id, user_id];
  // if (user_id !== req.cookies.user_id) {
  //   return next({ status: false, message: 'wrong user' });
  // }
  try {
    const cancelSellQuery = `UPDATE nfts SET status = false WHERE nft_id = $1 AND user_id = $2 RETURNING *;`;
    //check if user_id is equal to res.cookie.user_id
    const cancelSell = await db.query(cancelSellQuery, param);
    console.log(cancelSell);
    res.locals.nftData = cancelSell.rows[0];
    // console.log(res.locals.nftData)
    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.stopSellNFT middleware',
      status: 400,
      message: {
        err: `apiController.stopSellNFT: ERROR: ${error}`,
      },
    });
  }
};

apiController.createNFT = async (req, res, next) => {
  //by default status is false
  // const arrayOfData = ()
  // const queryString = `INSERT INTO NFT (name, ) `;
  // db.query(queryString, arrayOfData)
  const user_id = Number(req.cookies.user_id)
  const { name, url } = req.body; //user should be an object from frontend
  // const {user_id} = req.cookie.user_id;
  
  // COMMENT: frontend does not send price/status to backend, values should be default to
  // 0 and false respectively. Give an error if use line 179
   const param = [user_id, name, 0, url, false];
  //const param = [user_id, name, 0, url, false];  
  try {
    const createNewNFT = `
      INSERT INTO nfts( user_id, name, price, url, status)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *;`;

    const createdNewNFT = await db.query(createNewNFT, param);

    res.locals.newNFT = createdNewNFT.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.createNFT middleware',
      status: 400,
      message: {
        err: `apiController.createNFT: ERROR: ${error}`,
      },
    });
  }
};

apiController.deleteNFT = async (req, res, next) => {
  const user_id = Number(req.cookies.user_id)
  const { nft_id } = req.body;
  const param = [user_id, nft_id];
  // if (user_id !== req.cookies.user_id) {
  //   return next({ status: false, message: 'wrong user' });
  // }
  try {
    const deleteQuery = `
    DELETE FROM nfts
    WHERE user_id = $1 AND nft_id = $2
    RETURNING *
    `;
    const data = await db.query(deleteQuery, param);
    res.locals.nftData = data.rows[0];

    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.deleteNFT middleware',
      status: 400,
      message: {
        err: `apiController.deleteNFT: ERROR: ${error}`,
      },
    });
  }
};

module.exports = apiController;
