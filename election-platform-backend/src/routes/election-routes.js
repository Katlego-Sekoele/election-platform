const express = require('express');
const ElectionController = require('../controllers/election-controller');
const router = express.Router();

router.post('/', ElectionController.createElection);
router.get('/', ElectionController.getElections);
router.get('/:id', ElectionController.getElectionById);
router.put('/:id', ElectionController.updateElectionById);
router.delete('/:id', ElectionController.deleteElectionById);
router.post('/:id/parties', ElectionController.addPartyToElection);
router.delete('/:id/parties/:partyId', ElectionController.removePartyFromElection);

module.exports = router;
