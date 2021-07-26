const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./likes');


User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

Likes.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Likes, {
    foreignKey: 'user_id'
});


module.exports = {
    User,
    Post,
    Comment,
    Likes
};