const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const middleware = require('../../middleware');

const User = require('../../models/User.js');
const Post = require('../../models/Post.js');

router.get('/', middleware.requireLogin, async (req, res) => {
    Post.findAll({
        group: [['title']]
    })
        .then((results) =>
        res.status(200).send(results)
        )
    })

router.get('/:title', middleware.requireLogin, (req, res) => {
    Post.findAll({
        where: { title: req.params.title }
    }).then((results) => {
        res.status(200).send(results)
    })
})

module.exports = router;