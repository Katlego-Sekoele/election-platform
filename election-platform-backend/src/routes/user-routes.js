const express = require('express');
const UserController = require('../controllers/user-controller');
const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.findUserById);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
