const express = require('express');
const router = require('express').Router();
const sequelize = require('../config/connection');
const middleware = require('../middleware');
const Post = require('../models/Post.js');
const { Op } = require("sequelize");


router.get('/', middleware.requireLogin, (req, res) => {
    res.status(200).render('leaderboard', req.body);
})

router.get('/:title', middleware.requireLogin, async (req, res) => {
    var leaderboardCategory = await Post.findAll({
        where: {
            title: req.params.title
        }
    })

    res.status(200).render("leaderboardCategory", leaderboardCategory)
})


module.exports = router;