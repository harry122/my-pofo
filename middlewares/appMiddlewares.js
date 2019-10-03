module.exports.logger = (req,res,next) => {
    console.log(req.method,req.url);
    next();
};

module.exports.authenticate = (req,res,next) => {
    let isLoggedIn = req.session.isLoggedIn;
    if(isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports.authenticated = (req,res,next) => {
    if(req.session.isLoggedIn) {
        res.locals.user = req.session.user;
        next();
    } else {
        next();
    }
}
