const express = require('express');
const sadminmodel = require.main.require('./models/sadminmodel');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['email'] != null) {
    res.render('superadmin/dash/index');
  } else {
    res.redirect('/superadminlogin');
  }
});

router.get('/shoplist', (req, res) => {
  sadminmodel.getAll(function (results) {
    res.render('superadmin/dash/shoplist', { shoplist: results });
  });
});

module.exports = router;
