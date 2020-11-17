const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.uname != null;
  if (req.cookies['uname'] != null) {
    var data = {
      name: req.session.uname,
      id: 16,
    };
    res.render('admin/index', data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
