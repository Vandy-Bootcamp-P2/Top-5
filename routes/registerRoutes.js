const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.status(200).render('register');
})

router.post('/', async (req, res, next) => {
    
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    if(firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((err) => {
            console.log(err);
        });

        if(user == null) {
            // no existing user found
            var data = req.body;
            // password encryption
            data.password = await bcrypt.hash(password, 10);
            // create the user in the database
            User.create(data)
                .then((user) => {
                    // start session, redirect to homepage
                    req.session.user = user;
                    return res.redirect('/');
                })

        } else {
            // existing user found
            if (email == user.email) {
                req.body.errorMessage = "Email already in use";
            }
            else {
                req.body.errorMessage = "Username already in use";
            }
            res.status(200).render('register', req.body);
        }
    } else {
        req.body.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render('register', req.body);
    }
});

module.exports = router;