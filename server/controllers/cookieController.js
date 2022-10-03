const cookieController = {};

//sets the cookie equal to the user_id
cookieController.setUsernameCookie = (req, res, next) => {
  if (!req.body.username) {
    next('cookieController.setSSIDCookie: No userID specified');
  }
  if (res.locals.status.status === true) {
		// setting cookie to user_id
    res.cookie('user_id', res.locals.user_id, {
      maxAge: 900000,
      httpOnly: true,
    });
  }
  next();
};

//deletes the cookie if the user logs out
cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('user_id');
  // res.locals.status = { status: true, message: 'Successful Logout!' };
  // COMMENT: change to status: false for auth in front end
  res.locals.status = { status: false, message: 'Successful Logout!' };
  next();
};

module.exports = cookieController;
