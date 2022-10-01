const { UNSAFE_NavigationContext } = require('react-router-dom');
const db = require('../models/dbModels');

const userController = {};

//create user
userController.createUser = (req, res, next) => {
  const { username, password, money } = req.body; //user should be an object from frontend

  const param = [username, password, money];
  const existingUser = { status: false };
  try {
    const newCharQuery = `
    INSERT INTO users(username, password, money)
    VALUES($1,$2, $3)
    RETURNING *;
    `;
    db.query(newCharQuery, param)
      .then((data) => {
        console.log(data);

        res.locals.user = data.rows[0].name;
      })
      .then(next());
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

userController.verifyUser = (req, res, next) => {
  const usernameV = req.body.username;
  const passwordV = req.body.password;
  const auth = { status: false };
  try {
    const newNameQuery = `
    SELECT * FROM users 
    WHERE name = '${usernameV}'
    `;
    db.query(newNameQuery).then((data) => {
      //console.log(data.rows[0].password, passwordV);
      if (data.rows[0].password === passwordV) {
        console.log(data.rows[0].password);
        auth.status = true;
      }
      res.locals.auth = auth;
      //    console.log(res.locals.auth)
      return next();
    });
  } catch (error) {
    return next({
      log: 'Express error in createUser middleware',
      status: 400,
      message: {
        err: `userController.verifyUser: ERROR: ${error}`,
      },
    });
  }
};

module.exports = userController;