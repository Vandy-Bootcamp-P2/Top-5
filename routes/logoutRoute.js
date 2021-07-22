const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', (req, res) => {
    res.status(200).render('login');
})


module.exports = router;