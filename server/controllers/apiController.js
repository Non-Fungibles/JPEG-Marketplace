const db = require('../models/dbModels');

const apiController = {};

//middleware for getting NFT's on the marketplace
apiController.getMarket = (req, res, next) => {
  const queryString = 'SELECT * FROM nfts WHERE status = false'
	db.query(queryString)
	.then(result => {
		res.locals.marketData = result.rows;
		next();
	})
	.catch(err => {
		return next({
			err: "error in apiController.getMarket error retrieving marketdata",
			status: 500,
			 message: {err: "error in apiController.getMarket"}
			})
	})
}


apiController.sellNFT = (req, res, next) => {
	//this is where we set the status of said nft to true;
}

apiController.stopSellNFT = (req, res, next) => {
	//this is where we set the status of said NFT to false
}


apiController.addNFT =(req, res, next) => {
  
	//by default status is false 
	// const arrayOfData = ()
	// const queryString = `INSERT INTO NFT (name, ) `;
  // db.query(queryString, arrayOfData)
}


apiController.getPersonalNFT = (req, res, next) => {

	
}







module.exports = apiController;


// dataController.storeData = (req, res, next) => {
//     const {
//       homeValue,
//       downPayment,
//       loanAmount,
//       interestRate,
//       loanTerm,
//       monthlyPayment,
//       username,
//     } = req.body; //user should be an object from frontend
//     const param = [
//       homeValue,
//       downPayment,
//       loanAmount,
//       interestRate,
//       loanTerm,
//       monthlyPayment,
//       username,
//     ];
//     try {
//       const dataQuery = `
//       INSERT INTO homedata(homeValue,downPayment,loanAmount,interestRate,loanTerm,payment,username)
//       VALUES($1,$2,$3,$4,$5,$6,$7)
//       RETURNING *;
//       `;
//       db.query(dataQuery, param)
//         .then((data) => {
//           console.log(data);
//         })
//         .then(next());
//     } catch (error) {
//       return next({
//         log: 'Express error in createUser middleware',
//         status: 400,
//         message: {
//           err: `dataController.storeData: ERROR: ${error}`,
//         },
//       });
//     }
//   };
  
//   dataController.getUserData = (req, res, next) => {
//     try {
//       const user = req.body.username;
  
//       const getUserDataQuery = `
//       SELECT * FROM homedata
//       WHERE username = '${user}'`;
//       db.query(getUserDataQuery).then((data) => {
//         res.locals.list = data.rows;
//         console.log(data.rows);
//         return next();
//       });
//     } catch (error) {
//       return next({
//         log: 'Express error in createUser middleware',
//         status: 400,
//         message: {
//           err: `dataController.getUserData : ERROR: ${error}`,
//         },
//       });
//     }
//   };
  