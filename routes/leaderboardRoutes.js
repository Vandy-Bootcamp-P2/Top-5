const express = require('express');
const router = require('express').Router();
const sequelize = require('../config/connection');
const middleware = require('../middleware');
const Post = require('../models/Post.js');
const { Op } = require("sequelize");


router.get('/', middleware.requireLogin, (req, res) => {
    Post.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('title')) , 'posts'],
        ],
        where: {
            title: {
                [Op.not]: '',
            }}
    }).then(function(posts) { 
        for (i=0; i < posts.length; i++) {
        console.log(posts[i].dataValues.posts);
        }
     })

    res.render('leaderboard');
})

module.exports = router;