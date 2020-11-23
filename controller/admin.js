const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
const path = require('path');
const yup = require('yup');

// Admin Index Page Render
router.get('/', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'Pending',
    };
    admin_model.getByEmail(admininfo, function (results) {
      admin_model.countAllCustomer(admininfo, function (results2) {
        admin_model.getallPendingOrder(admininfo, function (results3) {
          admin_model.getAllProductsCount(admininfo, function (results4) {
            admin_model.getPendingOrder(admininfo, function (results5) {
              console.log(results2);
              res.render('admin/index', {
                admininfo: results,
                countAllCustomer: results2,
                pendingOrder: results3,
                productsCount: results4,
                orders: results5,
              });
            });
          });
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Change Password Page Render
router.get('/change_password', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      res.render('admin/admin-chnage-password', { admininfo: results });
    });
  } else {
    res.redirect('/');
  }
});

// Change Password --POST
router.post('/change_password', (req, res) => {
  var admininfo = {
    old_password: req.body.old_password,
    email: req.cookies['uname'],
    new_password: req.body.new_password,
    c_new_password: req.body.c_new_password,
    registration_date: new Date().toLocaleDateString(),
  };

  const changePasswordSchema = yup.object().shape({
    old_password: yup.string().min(4).max(19).required(),
    new_password: yup.string().min(4).max(19).required(),
    c_new_password: yup.string().min(4).max(19).required(),
  });

  changePasswordSchema.isValid(admininfo).then(function (valid) {
    if (valid) {
      admin_model.getByEmail(admininfo, function (results) {
        if (admininfo.old_password === results[0].password) {
          if (admininfo.new_password === admininfo.c_new_password) {
            admin_model.updateAdminPass(admininfo, function (status) {
              res.send(
                '<script>alert("Password Change Successful"); window.location.href ="/admin"; </script>'
              );
            });
          } else {
            res.send('Not Update');
          }
        } else {
          res.send(
            '<script>alert("Password Not Match"); window.location.href ="/admin/change_password"; </script>'
          );
        }
      });
    } else {
      res.send(
        '<script>alert("Change Password Error"); window.location.href ="/admin/change_password"; </script>'
      );
    }
  });
  changePasswordSchema.validate(admininfo).catch(function (err) {
    res.render('admin/error-page/chnagePasswordErr', { error: err.errors });
  });
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
      ' <script>alert("Password Not Match"); window.location.href ="/admin/add_new_customer";</script>'
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

// Pending Orders--GET
router.get('/pending_orders', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'Pending',
    };
    admin_model.getPendingOrder(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/pending-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Orders Page Render
router.get('/edit_orders/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'Pending',
      id: req.params.id,
    };
    admin_model.getPendingOrderById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/edit-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Orders--POST
router.post('/edit_orders/:id', (req, res) => {
  var orderInfo = {
    id: req.params.id,
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
    status: req.body.status,
  };
  admin_model.updateOrder(orderInfo, function (status) {
    if (status) {
      res.redirect('/admin/pending_orders');
    } else {
      res.send('Not Update');
    }
  });
});

// Delivered Orders--GET
router.get('/delivered_orders', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'Delivered',
    };
    admin_model.getPendingOrder(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/delivered-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Delete Delivered Orders--GET
router.get('/delete_delivered_order/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var orderInfo = {
      id: req.params.id,
    };
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getOrderById(orderInfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/delete-delivered-order', {
          orderInfo: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Delete Delivered Orders--POST
router.post('/delete_delivered_order/:id', (req, res) => {
  var customersInfo = {
    id: req.params.id,
  };
  admin_model.deleteOrder(customersInfo, function (status) {
    if (status) {
      res.redirect('/admin/delivered_orders');
    } else {
      res.send('Delete failed');
    }
  });
});

// In Process Orders-->GET
router.get('/in_process_orders', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'In Process',
    };
    admin_model.getPendingOrder(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/in-process-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});
// In Process Orders Edit-->GET
router.get('/edit_orders_in_process/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      status: 'In Process',
      id: req.params.id,
    };
    admin_model.getPendingOrderById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/edit-orders', {
          orders: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Orders--POST
router.post('/edit_orders_in_process/:id', (req, res) => {
  var orderInfo = {
    id: req.params.id,
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
    status: req.body.status,
  };
  admin_model.updateOrder(orderInfo, function (status) {
    if (status) {
      res.redirect('/admin/in_process_orders');
    } else {
      res.send('Not Update');
    }
  });
});

// All Categories-->GET
router.get('/all_categories', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getAllCategory(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/all-categories', {
          category: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// All Sub-Categories-->GET
router.get('/all_sub_categories', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getAllSubCategory(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/all-sub-categories', {
          subcategory: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Create Category-->GET
router.get('/add_category', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      res.render('admin/add-category', { admininfo: results });
    });
  } else {
    res.redirect('/');
  }
});

// Create Category-->POST
router.post('/add_category', (req, res) => {
  var category = {
    category_name: req.body.category_name,
    drescription: req.body.category_name,
    creation_date: new Date().toLocaleDateString(),
    store: req.cookies['uname'],
  };
  const createSchema = yup.object().shape({
    category_name: yup.string().min(3).max(19).required(),
    drescription: yup.string().max(150).required(),
    creation_date: yup.string().required(),
    store: yup.string().email().required(),
  });

  createSchema.isValid(category).then(function (valid) {
    if (valid === true) {
      admin_model.insertCategory(category, function (status) {
        if (status) {
          res.send(
            ' <script>alert("Added New Category"); window.location.href ="/admin/all_categories";</script>'
          );
        } else {
          res.send(
            ' <script>alert("Failed !!"); window.location.href ="/admin/add_category";</script>'
          );
        }
      });
    } else {
      res.send(
        ' <script>alert("Failed !!"); window.location.href ="/admin/add_category";</script>'
      );
    }
  });
  createSchema.validate(category).catch(function (err) {
    res.render('admin/error-page/addCategoryErr', { error: err.errors });
  });
});

// Create SubCategory-->GET
router.get('/add_sub_category', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(admininfo, function (results) {
      admin_model.getAllCategory(admininfo, function (results2) {
        res.render('admin/add-sub-category', {
          admininfo: results,
          category: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Create SubCategory-->POST
router.post('/add_sub_category', (req, res) => {
  var category = {
    category: req.body.category,
    sub_category: req.body.sub_category,
    creation_date: new Date().toLocaleDateString(),
    store: req.cookies['uname'],
  };
  const createSchema = yup.object().shape({
    category: yup.number().required(),
    sub_category: yup.string().min(4).max(19).required(),
    creation_date: yup.string().required(),
    store: yup.string().email().required(),
  });

  createSchema.isValid(category).then(function (valid) {
    if (valid === true) {
      admin_model.insertSubCategory(category, function (status) {
        if (status) {
          res.send(
            ' <script>alert("Added Sub-Category"); window.location.href ="/admin/all_sub_categories";</script>'
          );
        } else {
          res.send(
            ' <script>alert("Failed !!"); window.location.href ="/admin/add_sub_category";</script>'
          );
        }
      });
    } else {
      res.send(
        ' <script>alert("Failed !!"); window.location.href ="/admin/add_sub_category";</script>'
      );
    }
  });
  createSchema.validate(category).catch(function (err) {
    res.render('admin/error-page/addSubCategoryErr', { error: err.errors });
  });
});

// Edit Category--GET
router.get('/edit_category/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getCategoryById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/edit-category', {
          category: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Category--POST
router.post('/edit_category/:id', (req, res) => {
  var category = {
    category_name: req.body.category_name,
    category_drescription: req.body.category_drescription,
    id: req.params.id,
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
  };
  admin_model.updateCategory(category, function (status) {
    if (status) {
      res.redirect('/admin/all_categories');
    } else {
      res.send('Not Update');
    }
  });
});
// Delete Category--GET
router.get('/delete_category/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getCategoryById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/delete-category', {
          category: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Delete Category--POST
router.post('/delete_category/:id', (req, res) => {
  var category = {
    id: req.params.id,
  };
  admin_model.deleteCategory(category, function (status) {
    if (status) {
      res.redirect('/admin/all_categories');
    } else {
      res.send('Delete failed');
    }
  });
});

// Edit Sub-Category--GET
router.get('/edit_sub_category/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getSubCategoryById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        admin_model.getAllCategory(admininfo, function (results3) {
          res.render('admin/edit-sub-category', {
            category: results,
            admininfo: results2,
            allcategory: results3,
          });
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Sub-Category--POST
router.post('/edit_sub_category/:id', (req, res) => {
  var category = {
    category: req.body.category,
    sub_category_name: req.body.sub_category_name,
    id: req.params.id,
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
  };
  admin_model.updateSubCategory(category, function (status) {
    if (status) {
      res.redirect('/admin/all_sub_categories');
    } else {
      res.send('Not Update');
    }
  });
});

// Delete Sub-Category--GET
router.get('/delete_sub_category/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getSubCategoryById(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        res.render('admin/delete-sub-category', {
          category: results,
          admininfo: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Delete Sub-Category--POST
router.post('/delete_sub_category/:id', (req, res) => {
  var category = {
    id: req.params.id,
  };
  admin_model.deleteSubCategory(category, function (status) {
    if (status) {
      res.redirect('/admin/all_sub_categories');
    } else {
      res.send('Delete failed');
    }
  });
});
// All all_products
router.get('/all_products', (req, res) => {
  if (req.cookies['uname'] != null) {
    var allproduct = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(allproduct, function (results) {
      admin_model.getAllProducts(allproduct, function (results2) {
        res.render('admin/all-products', {
          admininfo: results,
          products: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Manage  all_products
router.get('/manage_product', (req, res) => {
  if (req.cookies['uname'] != null) {
    var allproduct = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(allproduct, function (results) {
      admin_model.getAllProducts(allproduct, function (results2) {
        res.render('admin/manage-product', {
          admininfo: results,
          products: results2,
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Add New Product--GET
router.get('/add_new_product', (req, res) => {
  if (req.cookies['uname'] != null) {
    var category = {
      email: req.cookies['uname'],
    };
    admin_model.getByEmail(category, function (results) {
      admin_model.getAllCategory(category, function (results2) {
        admin_model.getAllSubCategoryP(category, function (results3) {
          res.render('admin/add-new-product', {
            admininfo: results,
            category: results2,
            subcategory: results3,
          });
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Add new product -->POST

router.post('/add_new_product', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log('image data', req.files.image);

  const imageFile = req.files.image;

  imageFile.mv(
    path.join(__dirname, '../assets/uploads', imageFile.name),
    (res) => console.log('file save successful', res)
  );
  // res.json({
  //   success: true,
  // });
  var products = {
    category: req.body.category,
    sub_category: req.body.sub_category,
    product_name: req.body.product_name,
    product_brand: req.body.product_brand,
    product_description: req.body.product_description,
    shipping_charge: req.body.shipping_charge,
    product_availability: req.body.product_availability,
    product_stock: req.body.product_stock,
    price: req.body.price,
    product_discount: req.body.product_discount,
    image: imageFile.name,
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
  };
  admin_model.insertProduct(products, function (status) {
    if (status) {
      res.redirect('/admin/all_products');
    } else {
      res.send('failed');
    }
  });
});

// Edit Products--Get
router.get('/edit_product/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getAllSubCategoryP(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        admin_model.getAllCategory(admininfo, function (results3) {
          admin_model.getProductsById(admininfo, function (results4) {
            res.render('admin/edit-product', {
              subcategory: results,
              admininfo: results2,
              allcategory: results3,
              product: results4,
            });
          });
        });
      });
    });
  } else {
    res.redirect('/');
  }
});

// Edit Products--POST
router.post('/edit_product/:id', (req, res) => {
  var category = {
    email: req.cookies['uname'],
    last_update: new Date().toLocaleDateString(),
    id: req.params.id,
    category: req.body.category,
    sub_category: req.body.sub_category,
    product_name: req.body.product_name,
    product_brand: req.body.product_brand,
    product_description: req.body.product_description,
    shipping_charge: req.body.shipping_charge,
    product_availability: req.body.product_availability,
    product_stock: req.body.product_stock,
    price: req.body.price,
    product_image: 'image',
  };
  admin_model.updateProducts(category, function (status) {
    if (status) {
      res.redirect('/admin/manage_product');
    } else {
      res.send('Not Update');
    }
  });
});

// Delete Product-->GET
router.get('/delete_product/:id', (req, res) => {
  if (req.cookies['uname'] != null) {
    var admininfo = {
      email: req.cookies['uname'],
      id: req.params.id,
    };
    admin_model.getAllSubCategoryP(admininfo, function (results) {
      admin_model.getByEmail(admininfo, function (results2) {
        admin_model.getAllCategory(admininfo, function (results3) {
          admin_model.getProductsById(admininfo, function (results4) {
            res.render('admin/delete-product', {
              subcategory: results,
              admininfo: results2,
              allcategory: results3,
              product: results4,
            });
          });
        });
      });
    });
  } else {
    res.redirect('/');
  }
});
// Delete Product--POST
router.post('/delete_product/:id', (req, res) => {
  var category = {
    id: req.params.id,
  };
  admin_model.deleteProduct(category, function (status) {
    if (status) {
      res.redirect('/admin/manage_product');
    } else {
      res.send('Delete failed');
    }
  });
});

module.exports = router;
