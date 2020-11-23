const express = require('express');
const userModel = require.main.require('./models/userModel');
const admin_model = require.main.require('./models/admin_model');
const router = express.Router();

router.get('/', (req, res) => {
  var admininfo = {
    email: req.cookies['uname'],
  };
  admin_model.getAllCategory(admininfo, function (results) {
    admin_model.getByEmail(admininfo, function (results2) {
      userModel.getAll(admininfo, function (results3) {
        // res.send(results3);
        res.render('store/home', {
          category: results,
          admininfo: results2,
          products: results3,
        });
      });
    });
  });
});
module.exports = router;
