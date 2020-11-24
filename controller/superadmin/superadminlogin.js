const express = require('express');
const sadminmodel = require('../../models/sadminmodel');
//const userModel	= require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('superadmin/superadminlogin/index');
});

router.post('/', (req, res) => {
  var user = {
    email: req.body.email,
    password: req.body.password,
  };

  sadminmodel.validate(user, function (status) {
    if (status) {
      res.cookie('email', req.body.email);
      res.redirect('/dash');
    } else {
      res.redirect('/superadminlogin');
    }
  });
});

module.exports = router;
