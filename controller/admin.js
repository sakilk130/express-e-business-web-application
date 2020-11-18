const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    var data = {
      name: req.cookies['uname'],
      id: 16,
    };
    res.render('admin/index', data);
  } else {
    res.redirect('/');
  }
});

router.get('/change_password', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('admin/admin-chnage-password');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
