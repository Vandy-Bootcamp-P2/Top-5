const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const middleware = require('../../middleware');

const User = require('../../models/User.js');
const Post = require('../../models/Post.js');

router.get('/', (req, res) => {
    Post.findAll()
    .then((results) => {
        res.status(200).send(results)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.post('/', (req, res, next) => {
    console.log(req.body);
    if (!req.body) {
        console.log("no content in request");
        return res.sendStatus(400);
    }

    var postData = {
        title: req.body.title,
        caption: req.body.caption,
        field1: req.body.field1,
        field2: req.body.field2,
        field3: req.body.field3,
        field4: req.body.field4,
        field5: req.body.field5,
        user_id: req.session.user.id
    }


    Post.create(postData)
    .then(newPost => {
        res.status(200).send(newPost);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})


module.exports = router;