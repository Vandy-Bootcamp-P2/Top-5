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
        where: { title: req.params.title },
    }).then((results) => {
        let allFields = [];
        results.forEach((post) => {
            // Place weighting (1st place submission gets 5 points, 2nd gets 4 etc.)
            for (let i=0; i < 5; i++) { allFields.push(post.dataValues.field1) }
            for (let i=0; i < 4; i++) { allFields.push(post.dataValues.field2) }
            for (let i=0; i < 3; i++) { allFields.push(post.dataValues.field3) }
            for (let i=0; i < 2; i++) { allFields.push(post.dataValues.field4) }
            allFields.push(post.dataValues.field5)
        })
        allFields = allFields.filter(target => target != "")
        res.status(200).send(allFields)
    })
})

module.exports = router;