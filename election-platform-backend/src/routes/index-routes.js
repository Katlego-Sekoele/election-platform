const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

router.get('/hello-world', async (request, response) => {
  try {
    response.send(`Hello, World! Time: ${Date.now().toString()}`);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

module.exports = router;
