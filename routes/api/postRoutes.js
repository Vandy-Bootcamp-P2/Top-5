const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll()
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {

    // validate that request includes content
    if (!req.body.content) {
        res.sendStatus(400);
        return;
    }
    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData)
    .then(newPost => {
        res.json(newPost);
        res.status(201).send(newPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;