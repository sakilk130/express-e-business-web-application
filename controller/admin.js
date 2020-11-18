const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');

router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };

    admin_model.getByEmail(admininfo, function (results) {
      res.render('admin/index', { admininfo: results });
    });
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

// view All Customers
router.get('/all_customers', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      admin_model.getAllCustomers(admininfo, function (results2) {
        res.render('admin/all-customers', {
          admininfo: results,
          customersInfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Add New Customer
router.get('/add_new_customer', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      res.render('admin/add-new-customer', { admininfo: results });
    });
  } else {
    res.redirect('/');
  }
});

// Add New Customer-->POST
router.post('/add_new_customer', (req, res) => {
  var errorMessage = {
    password: 'Password Not Match',
  };
  var user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    registration_date: new Date().toLocaleDateString(),
    store: req.cookies['uname'],
    cpassword: req.body.cpassword,
  };
  if (user.password === user.cpassword) {
    admin_model.insert(user, function (status) {
      if (status) {
        res.redirect('/admin/all_customers');
      } else {
        res.send(user);
      }
    });
  } else {
    res.send(
      ' <script>alert("Password Not Match"); window.location.href ="/admin/add_new_customer";</script>'
    );
  }
});

module.exports = router;
