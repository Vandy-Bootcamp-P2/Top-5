const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const middleware = require('../../middleware');

const User = require('../../models/User.js');
const Post = require('../../models/Post.js');
const {
    Likes
} = require('../../models');

//get route
router.get('/', (res, req) => {
    Likes.findAll({
        attributes: {
            
        }
    })
})

//post route
router.post('/', (rec, res) => {
    
})


//creating the like route
router.put('/', (res, req) => {
    res.send('ellloooo amigo')
})


router.put('/:id', (res, req) => {
    Likes.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbP)
})


//delete route