var express = require('express');
var router = express.Router();
router.get('/', (req, res) => {
  res.send('Gratis Digital task completed by David Enoragbon');
});

module.exports = router;
