const db = require('../models/dbModels');

const apiController = {};

//middleware for getting NFT's on the marketplace
apiController.getMarket = (req, res, next) => {
  const queryString = 'SELECT * FROM nfts WHERE status = true';
  db.query(queryString)
    .then((result) => {
      console.log(result);
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

apiController.sellNFT = async (req, res, next) => {
  //this is where we set the status of said nft to true;

  const { nfts_id, user_id, price, status } = req.body; //user should be an object from frontend

  const param = [nfts_id, user_id, price, status];

  try {
    const sellQuery = `UPDATE nfts 
  SET status = $4, user_id = $2, price = $3 
  WHERE nfts_id = $1`;

    const updatedNFTowner = await de.query(sellQuery, param);
    res.locals.data = updatedNFTowner;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in apiController.sellNFT middleware',
      status: 400,
      message: {
        err: `apiController.sellNFT: ERROR: ${error}`,
      },
    });
  }
};

apiController.stopSellNFT = (req, res, next) => {
  //this is where we set the status of said NFT to false
};

apiController.addNFT = (req, res, next) => {
  //by default status is false
  // const arrayOfData = ()
  // const queryString = `INSERT INTO NFT (name, ) `;
  // db.query(queryString, arrayOfData)
};

apiController.getPersonalNFT = (req, res, next) => {};

module.exports = apiController;
