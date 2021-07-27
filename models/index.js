const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User);

User.hasMany(Post);

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

// Post.hasMany(comment, {
//     foreignKey: 'post_id'
// })

module.exports = { User, Post, Comment };
