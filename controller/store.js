const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
const { check, validationResult, cookie } = require('express-validator');

router.get(`/`, (req, res) => {
  res.send('Store Name');
});

module.exports = router;
