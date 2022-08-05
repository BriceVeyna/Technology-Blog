// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// Users have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Posts belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comments belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Posts have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// Comments belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = {
    User,
    Post,
    Comment,
};