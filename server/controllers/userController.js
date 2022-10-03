const { UNSAFE_NavigationContext } = require('react-router-dom');
const db = require('../models/dbModels');

const userController = {};

//create user
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body; //user should be an object from frontend

  const param = [username, password, 100];

  try {
    //push the data into DB
    const newCharQuery = `
    INSERT INTO users(username, password, money)
    VALUES($1,$2, $3)
    RETURNING *;
    `;

    const result = await db.query(newCharQuery, param);
    //console.log(result.rows[0].user_id)
    res.locals.user_id = result.rows[0].user_id;
    res.locals.status = { 
      user_id: result.rows[0].user_id,
      status: true, 
      message: 'Account has been created!'
    };

    return next();
  } catch (error) {
    return next({
      log: 'Express error in createUser middleware',
      status: 400,
      message: {
        err: `userController.createUser: ERROR: ${error}`,
      },
    });
  }
};

// Sign up route: check if user already exists in database
userController.verifyUser = async (req, res, next) => {
  const { username } = req.body;

  const param = [username];

  try {
    // Find user in database
    const verifyUserQuery = `
    SELECT * FROM users
    WHERE username = $1`;

    // Query result
    const verifyResult = await db.query(verifyUserQuery, param);

    // User does not exist in database
    if (verifyResult.rows.length === 0) {
      // proceed to next middleware to create user
      return next();
    } else {
      // User exists in database
      // Terminate middleware and send back error message to client
      return res
        .status(404)
        .json({ status: false, message: 'Username already existed!' });
    }
  } catch (error) {
    return next({
      log: 'Express error in vertifyUser middleware',
      status: 400,
      message: {
        err: `userController.verifyUser: ERROR: ${error}`,
      },
    });
  }
};

//log in
userController.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const param = [username];

  try {
    const newNameQuery = `
    SELECT * FROM users 
    WHERE username = $1
    `;
    const data = await db.query(newNameQuery, param);

    // setting user_id to res.locals for use in cookieController
    res.locals.user_id = data.rows[0].user_id;  

    //if the password matches
    if (data.rows[0].password === password) {
      // COMMENT: send user_id back to easily distinguish different users' cards
      // res.locals.status = { status: true, message: 'Successful Login!' };
      res.locals.status = {
        user_id: data.rows[0].user_id,
        status: true,
        message: 'Successful Login!'
      }
    } else {
      // res.locals.status = { status: false, message: 'Wrong Password!' };
      res.locals.status = {
        status: false,
        message: 'Wrong Password!'
      }
    }
    return next();
  } catch (error) {
    return next({
      log: 'Express error in userController.loginUser middleware',
      status: 400,
      message: {
        err: `userController.loginUser: ERROR: ${error}`,
      },
    });
  }
};

userController.getBalance = async(req, res, next) => {
 const user_id = Number(req.cookies.user_id); // use req.cookies to get user_id instead of req.params
  //  const { user_id } = req.body;
  const param = [user_id];
  try{
    const selectBalanceQueryfromUser = `
    SELECT users.money FROM users WHERE user_id = $1 
  `;
  
  const data = await db.query(selectBalanceQueryfromUser, param)
    res.locals.balance = data.rows[0];
    return next();
  }
  catch(error) {
    return next({
      log: 'Express error in userController.getBalance middleware',
      status: 400,
      message: {
        err: `userController.getBalance: ERROR: ${error}`
    }})
  }

  
}

module.exports = userController;
