const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('uname');
  res.redirect('/');
});

module.exports = router;
