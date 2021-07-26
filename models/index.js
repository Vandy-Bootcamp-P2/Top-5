const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./likes');


User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Likes.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Likes, {
    foreignKey: 'user_id'
});

//these dont run~~~
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Likes.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

Post.hasMany(Likes, {
    foreignKey: 'post_id'
})

//13.4.3 for reference
User.belongsToMany(Post, {
    through: Likes,
    as: 'liked_post',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
    through: Likes,
    as: 'liked_post',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = {
    User,
    Post,
    Comment,
    Likes
};