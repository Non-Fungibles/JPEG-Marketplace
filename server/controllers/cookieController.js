
const cookieController = {}


//sets the cookie equal to the username
cookieController.setUsernameCookie = (req, res, next) => {
 
  if(!req.body.username){
    next("cookieController.setSSIDCookie: No userID specified");
  }
	if (res.locals.status === true){
		res.cookie('username', req.body.username, {maxAge: 9000, httpOnly : true});
	}
	next();

}


module.exports = cookieController;