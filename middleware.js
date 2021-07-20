exports.requireLogin = (req, res, next) => {
    // go to homepage if login successful & session started, otherwise redirect to login page
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}