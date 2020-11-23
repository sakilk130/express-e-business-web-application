const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/:id', (req, res) => {
  var product_id = {
    product_id: req.params.id,
    email: req.cookies['uname'],
  };
  userModel.getAllCategory(function (product_id, result2) {
    userModel.getByProduct(product_id, function (result1) {
      res.render('product', { product_id: result1, category: result2 });
    });
  });
  // res.send("ok");
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
