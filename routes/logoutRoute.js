const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', (req, res) => {
    res.status(200).render('login');
})

router.get('/logout', function(req, res) {
    req.logout();
    if (!req.session) {
        req.session.destroy(function(err) {
            res.redirect('/login');
        });
    }
    else {
        res.redirect('/login');
    }
});



module.exports = router;