const express = require('express');
const UserRouter = require('./user-routes');

const router = express.Router();

router.use('/users', UserRouter);
// router.use('/elections');
// router.use('/candidates');
// router.use('/votes');
// router.use('/parties');

module.exports = router;
