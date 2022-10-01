
const cookieController = {}


//sets the cookie equal to the username
cookieController.setUsernameCookie = (req, res, next) => {
 
  if(!req.body.username){
    next("cookieController.setSSIDCookie: No userID specified");
  }
	if (res.locals.status.status === true){
		res.cookie('username', req.body.username, {maxAge: 9000, httpOnly : true});
	}
	next();

}

//deletes the cookie if the user logs out
cookieController.deleteCookie = (req, res, next) => {
	res.clearCookie('username');
	res.locals.status = { status: true, message: 'Successful Logout!' };
	next();
}

module.exports = cookieController;