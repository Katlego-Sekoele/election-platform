const express = require('express');
const UserRouter = require('./user-routes');
const ElectionRouter = require('./election-routes');
const CandidatesRouter = require('./candidate-routes');
const VotesRouter = require('./vote-routes');
const PartyRouter = require('./party-routes');
const router = express.Router();

router.use('/users', UserRouter);
router.use('/elections', ElectionRouter);
router.use('/candidates', CandidatesRouter);
router.use('/votes', VotesRouter);
router.use('/parties', PartyRouter);

module.exports = router;
