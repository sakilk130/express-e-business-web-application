const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
var mysql = require('mysql');
const { use } = require('./home');

router.get('/', (req, res) => {
  res.render('Register');
});

router.post('/', (req, res) => {
  var user = {
    store_name: req.body.store_name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    type: 'admin',
  };
  admin_model.register(user, function (status) {
    console.log(user);
    if (status) {
      res.render('admin/login');
    } else {
      res.send('Not Register');
    }
  });
});

module.exports = router;
