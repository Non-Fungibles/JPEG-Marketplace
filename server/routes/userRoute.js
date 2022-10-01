const express = require('express');

const apiController = require('../controllers/apiController.js');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const router = express.Router()

router.post(
	'/login', 
	userController.loginUser,
	cookieController.setUsernameCookie, 
	(req, res) => {
    res.status(200).json(res.locals.status);
  }
);

//this route will be called when a user signs up
//this route will return true if we created a user in the database
router.post(
	'/signup',
	(req,res,next) =>{console.log('in sign up route') 
	return next()},
	userController.vertifyUser, 
	userController.createUser,
	cookieController.setUsernameCookie,
  (req, res) => {
    return res.status(200).json(res.locals.status);
  }
);

//this route will log out the user
router.delete(
	'/logout',
	cookieController.deleteCookie,
	(req, res) => {
    return res.status(200).json(res.locals.status);
  }
)


//retrieves all NFT's that belong to a certain user upon successful sign in.
router.get('/', /*apiController middleware here  */)

module.exports = router;