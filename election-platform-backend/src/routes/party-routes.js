const express = require('express');
const PartyController = require('../controllers/party-controller');
const router = express.Router();

router.post('/', PartyController.createParty);
router.get('/', PartyController.getParties);
router.get('/:id', PartyController.getPartyById);
router.put('/:id', PartyController.updatePartyById);
router.delete('/:id', PartyController.deletePartyById);
router.post('/:id/candidates', PartyController.addCandidateToParty);
router.delete('/:id/candidates/:candidateId', PartyController.removeCandidateFromParty);

module.exports = router;
