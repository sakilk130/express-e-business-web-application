const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/login');
});

router.post('/', (req, res) => {
  if (req.body.username == req.body.password) {
    req.session.uname = req.body.username;
    res.cookie('uname', req.body.username);
    res.redirect('/index');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
