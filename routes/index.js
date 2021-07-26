const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const leaderboardRoutes = require('./leaderboardRoutes.js');
const loginRoutes = require('./loginRoutes.js')

router.use('/leaderboard', leaderboardRoutes);
router.use('/api', apiRoutes);
router.use('/', loginRoutes)

module.exports = router;