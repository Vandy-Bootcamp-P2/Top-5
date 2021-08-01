const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', (req, res) => {
    res.status(200).render('login');
})

router.post('/', async (req, res, next) => {

    if (req.body.logUsername && req.body.logPassword) {
        // validate logUsername and logPassword from form input at login.pug
        var user = await User.findOne({
            // use either username or password as valid login credential
            where: [
                { username: req.body.logUsername },
            ]
        })
            .catch((err) => {
                console.log(err);
            });
        // username or email is valid, check password
        if (user != null) {
            // compares user's normal password with the encrypted version in database
            var result = await bcrypt.compare(req.body.logPassword, user.password);
            // if successful, start session, redirect to homepage
            if (result === true) {
                // password passed
                req.session.user = user;
                return res.redirect('/');
            }
        }
        // else user == null (user not found)
        req.body.errorMessage = "Login credentials incorrect";
        res.status(200).render('login', req.body);
    }
    // if !logUsername or !logPassword
    req.body.errorMessage = "Make sure each field has a valid value";
    res.status(200).render("login");
})


module.exports = router;