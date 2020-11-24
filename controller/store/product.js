const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/:id', (req, res) => {
  var product_id = req.params.id;

  var customerID = req.cookies['customerID'];

  userModel.getByCustomer(customerID, function (result1) {
    userModel.getAllCategory(function (result2) {
      userModel.getByProduct(product_id, function (result3) {
        res.render('store/product', {
          product_id: result3,
          category: result2,
          customer: result1,
        });
      });
    });
  });
});

router.post('/:id', (req, res) => {
  var product_id = req.params.id;
  res.send('ok');
});

router.post('/', (req, res) => {
  // var product_id = req.params.id;
  res.send('ok');
});

router.get('/', (req, res) => {
  res.render('product');
});

module.exports = router;
