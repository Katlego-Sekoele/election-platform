const express = require('express');
const VoteController = require('../controllers/vote-controller');
const router = express.Router();

router.post('/', VoteController.createVote);

module.exports = router;
