const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');

// Admin Index Page Render
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

// Change Password Page Render
router.get('/change_password', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('admin/admin-chnage-password');
  } else {
    res.redirect('/');
  }
});

// View All Customers Page Render
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

// Add New Customer Page Render
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
      ' <script>alerCustomert("Password Not Match"); window.location.href ="/admin/add_new_customer";</script>'
    );
  }
});

// Manage Customer Page Render
router.get('/manage_customer', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      admin_model.getAllCustomers(admininfo, function (results2) {
        res.render('admin/manage-customer', {
          admininfo: results,
          customersInfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Customer Page Render
router.get('/edit_customer/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    var customersInfo = {
      id: req.params.id,
    };
    admin_model.getById(customersInfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/edit-customer', {
          customersInfo: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Customer-->POST
router.post('/edit_customer/:id', (req, res) => {
  var customersInfo = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    registration_date: new Date().toLocaleDateString(),
  };
  admin_model.update(customersInfo, function (status) {
    if (status) {
      res.redirect('/admin/manage_customer');
    } else {
      res.send('Not Update');
    }
  });
});

// Delete Customer--GET
router.get('/delete_customer/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var customersInfo = {
      id: req.params.id,
    };
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getById(customersInfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/delete-customer', {
          customersInfo: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Delete Customer--POST
router.post('/delete_customer/:id', (req, res) => {
  var customersInfo = {
    id: req.params.id,
  };
  admin_model.delete(customersInfo, function (status) {
    if (status) {
      res.redirect('/admin/manage_customer');
    } else {
      res.send('Delete failed');
    }
  });
});

// All Orders--GET
router.get('/all_orders', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getAllOrder(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/all-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
