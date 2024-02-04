const express = require('express');
const router = express.Router();

router.get('/hello-world', (req, res) => {
  res.send(`Hello, World! Time: ${Date.now().toString()}`);
});

module.exports = router;
