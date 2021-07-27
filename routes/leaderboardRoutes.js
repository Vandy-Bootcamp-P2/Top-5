const express = require('express');
const router = require('express').Router();
const sequelize = require('../config/connection');
const middleware = require('../middleware');
const Post = require('../models/Post.js');
const { Op } = require("sequelize");


router.get('/', middleware.requireLogin, async (req, res) => {
        res.status(200).render('leaderboard', req.body)
    })

router.get('/:title', middleware.requireLogin, async (req, res) => {
    res.status(200).render("leaderboardCategory", req.body)
})


module.exports = router;