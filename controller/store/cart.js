const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.post('/:id', (req, res) => {
  var customerID = req.params.id;

  var cart = {
    cu_id: req.body.cu_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };

  userModel.insertCart(cart, function (status) {
    if (status) {
      res.redirect('/cart/' + customerID);
    } else {
      res.send('no');
    }
  });

  // userModel.getCartList(customerID, function (results1) {
  //    userModel.getByProduct(cart.product_id, function (result2) {
  //       res.render("cart", { customerID: results1, product_id: result2, quantity: cart.quantity });
  //    });

  // });
});

router.get('/:id', (req, res) => {
  var customerID = req.params.id;

  userModel.getByCustomer(customerID, function (results2) {
    userModel.getByCart(customerID, function (results1) {
      res.render('store/cart', {
        info: results1,
        customerID: results2,
      });
    });
  });
});

router.get('/delete/:id', (req, res) => {
  var customer = req.cookies['customerID'];
  var cart_id = req.params.id;
  userModel.deleteCart(cart_id, function (results2) {
    res.redirect('/cart/' + customer);
  });
});

router.post('/order/:id', (req, res) => {
  var customer = req.cookies['customerID'];
  var cart_id = req.params.id;
  var today = new Date().toLocaleDateString();
  var store = req.cookies['uname'];

  var order = {
    cu_id: req.body.cu_id,
    id: req.body.id,
    quantity: req.body.quantity,
    order_date: today,
    order_status: 'Pending',
    store: store,
  };

  // res.send(order);

  userModel.orders(order, function (status) {
    if (status) {
      userModel.deleteCart(cart_id, function (results2) {
        res.send('order created');
      });
    } else {
      res.send('no');
    }
  });
});

module.exports = router;
