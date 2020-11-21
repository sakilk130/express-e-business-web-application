const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.render('admin/login');
});

router.post('/', (req, res) => {
  var user = {
    email: req.body.email,
    password: req.body.password,
  };
  admin_model.validate(user, function (status) {
    if (status) {
      res.cookie('uname', req.body.email);
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
