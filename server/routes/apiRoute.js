const express = require('express');

const apiController = require('../controllers/apiController.js');
const userController = require('../controllers/userController.js');
const { route } = require('../server.js');
const router = express.Router();
const userRoute = require('./userRoute.js');

//this route will retrieve all of the NFT's where the status equals true(on the marketplace)
router.get('/markets', apiController.getMarket, (req, res) => {
  return res.status(200).json(res.locals.marketData);
});

//this route will update the NFT's data when bought or when the user sets the NFT up for sale or update data
router.patch(
  //COMMENT: Maybe use nft_id in the request.params
  '/sellNFTtoMarketplace',
  apiController.sellNFTtoMarketplace,
  (req, res) => {
    return res.status(200).json(res.locals.nftData);
  }
);

//change nft owership
//return the new buyer's list of nfts
router.patch(
  '/buyNFTfromMarketplace',
  apiController.buyNFTfromMarketplace,
  apiController.exchangeMoney,
  (req, res) => {
    return res.status(200).json({nftData: res.locals.updatedNFT, balance: res.locals.balance});
  }
);

router.patch(
  '/cancelNFTfromMarketplace',
  apiController.stopSellNFT,
  (req, res) => {
    return res.status(200).json(res.locals.nftData);
  }
);

router.delete('/', apiController.deleteNFT, (req, res) => {
  return res.status(200).json(res.locals.nftData);
});

//this route will add an NFT to the database
router.post('/add', apiController.createNFT, (req, res) => {
  return res.status(200).json(res.locals.newNFT);
});

//routes login/signup requests to userRoute router
router.use('/users', userRoute);

module.exports = router;
