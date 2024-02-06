const express = require('express');
const UserController = require('../controllers/user-controller');
const router = express.Router();

// router.post('/:id', UserController);
router.get('/:id', UserController.findUserById);
// router.put('/:id', UserController);
// router.delete('/:id', UserController);

module.exports = router;
