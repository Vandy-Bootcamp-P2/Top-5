const router = require('express').Router();

const commentRoutes = require('./commentRoutes.js');
const leaderboardRoutes = require('./leaderboardRoutes.js');
const postRoutes = require('./postRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/comments', commentRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
