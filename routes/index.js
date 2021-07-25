const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const leaderboardRoutes = require('./leaderboardRoutes.js');

router.use('/leaderboard', leaderboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;