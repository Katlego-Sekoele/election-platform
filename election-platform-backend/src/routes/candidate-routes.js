const express = require('express');
const CandidateController = require('../controllers/candidate-controller');
const router = express.Router();

router.post('/', CandidateController.createCandidate);
router.get('/', CandidateController.getCandidates);
router.get('/:id', CandidateController.getCandidateById);
router.put('/:id', CandidateController.updateCandidateById);
router.delete('/:id', CandidateController.deleteCandidateById);

module.exports = router;
