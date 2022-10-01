const express = require('express');

const apiController = require('../controllers/apiController.js');
const userController = require('../controllers/userController.js');
const router = express.Router();

//this route will retrieve all of the NFT's where the status equals true(on the marketplace)
router.get('/markets', apiController.getMarket, (req, res) => {
  return res.status(200).json(res.locals.marketData);
});

//this route will update the NFT's data when bought or when the user sets the NFT up for sale or update data
router.patch(
  '/markets/' /*api middeware here buy/sell logic here update price for nft and user id */
);

//send in the buyer's username inside the request.body.username
//nft id in the request.params

//this route will add an NFT to the database
router.post(
  '/',
  /*api controller add NFTs*/ (req, res) => {
    //by default nft status is false.
  }
);

//this route will verify if a user is logged in
//will return true if this is a user
//if username/password doesn't match this will return false
router.post('/users/login', userController.loginUser, (req, res) => {
  res.status(200).json(res.locals.status);
});

//this route will be called when a user signs up
//this route will return true if we created a user in the database
router.post(
  '/users/signup',
  userController.vertifyUser,
  userController.createUser,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);


router.post('/uploadData')
module.exports = router;
