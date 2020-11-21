const db = require('./db');

module.exports = {
  validate: function (user, callback) {
    var sql =
      "select * from user where email='" +
      user.email +
      "' and password='" +
      user.password +
      "'";
    db.getResults(sql, function (results) {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },
  getById: function (user, callback) {
    var sql = "SELECT * FROM customers WHERE id='" + user.id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  countAllCustomer: function (user, callback) {
    // var sql = "SELECT COUNT(*) FROM customers WHERE store='" + user.email + "'";
    var sql = "SELECT * FROM customers WHERE store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByEmail: function (user, callback) {
    var sql = "SELECT * FROM user WHERE email='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  updateAdminPass: function (user, callback) {
    sql =
      "UPDATE user SET password='" +
      user.c_new_password +
      "'WHERE email='" +
      user.email +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  getAllCustomers: function (user, callback) {
    var sql = "select * from customers WHERE store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (user, callback) {
    var sql =
      "INSERT INTO customers (name, email, password, phone, address, registration_date, store) VALUES ('" +
      user.name +
      "' , '" +
      user.email +
      "' , '" +
      user.password +
      "', '" +
      user.phone +
      "', '" +
      user.address +
      "', '" +
      user.registration_date +
      "', '" +
      user.store +
      "')";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  update: function (user, callback) {
    sql =
      "UPDATE customers SET name='" +
      user.name +
      "',email='" +
      user.email +
      "', phone='" +
      user.phone +
      "',address='" +
      user.address +
      "',registration_date='" +
      user.registration_date +
      "' where id='" +
      user.id +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  delete: function (user, callback) {
    sql = "DELETE FROM customers WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  // Order_Managment
  // Get All Order
  getAllOrder: function (user, callback) {
    var sql =
      "SELECT customers.name AS username, customers.email AS useremail, customers.phone AS userphone, customers.address AS useraddress, orders.quantity AS orderquantity, orders.order_date AS ordersorder_date, orders.status AS ordersstatus, orders.id AS ordersid, products.product_name AS productname, products.product_brand AS productbrand, products.product_description AS productdescription, products.product_price AS productprice FROM customers JOIN orders ON customers.id = orders.customer_id JOIN products ON products.id = orders.product_id WHERE customers.store='" +
      user.email +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  // Get Pending Order
  getPendingOrder: function (user, callback) {
    var sql =
      "SELECT customers.name AS username, customers.email AS useremail, customers.phone AS userphone, customers.address AS useraddress, orders.quantity AS orderquantity, orders.order_date AS ordersorder_date, orders.status AS ordersstatus,orders.id AS ordersid, products.product_name AS productname, products.product_brand AS productbrand, products.product_description AS productdescription, products.product_price AS productprice FROM customers JOIN orders ON customers.id = orders.customer_id JOIN products ON products.id = orders.product_id WHERE customers.store='" +
      user.email +
      "' AND orders.status='" +
      user.status +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getPendingOrderById: function (user, callback) {
    var sql =
      "SELECT customers.name AS username, customers.email AS useremail, customers.phone AS userphone, customers.address AS useraddress, orders.quantity AS orderquantity, orders.order_date AS ordersorder_date, orders.status AS ordersstatus,orders.id AS ordersid, products.product_name AS productname, products.product_brand AS productbrand, products.product_description AS productdescription, products.product_price AS productprice FROM customers JOIN orders ON customers.id = orders.customer_id JOIN products ON products.id = orders.product_id WHERE customers.store='" +
      user.email +
      "' AND orders.status='" +
      user.status +
      "' AND orders.id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  updateOrder: function (user, callback) {
    sql =
      "UPDATE orders SET status='" +
      user.status +
      "',last_update='" +
      user.last_update +
      "' where id='" +
      user.id +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  // Delete Order
  getOrderById: function (user, callback) {
    var sql = "SELECT * FROM orders WHERE id='" + user.id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  deleteOrder: function (user, callback) {
    sql = "DELETE FROM orders WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  // All Category

  getAllCategory: function (user, callback) {
    var sql = "select * from category WHERE store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  // get All Sub Category
  getAllSubCategory: function (user, callback) {
    var sql =
      "SELECT category.category_name AS categoryname, subcategory.sub_category_name AS subcategoryname, subcategory.creation_date AS creationdate, subcategory.update_date AS updatedate, subcategory.id AS subcategoryid FROM category JOIN subcategory ON category.id = subcategory.category_id WHERE subcategory.store='" +
      user.email +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insertCategory: function (user, callback) {
    var sql =
      "INSERT INTO category (category_name, category_description, creation_date, store) VALUES ('" +
      user.category_name +
      "' , '" +
      user.drescription +
      "' , '" +
      user.creation_date +
      "', '" +
      user.store +
      "')";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  insertSubCategory: function (user, callback) {
    var sql =
      "INSERT INTO subcategory (category_id, sub_category_name, creation_date, store) VALUES ('" +
      user.category +
      "' , '" +
      user.sub_category +
      "' , '" +
      user.creation_date +
      "', '" +
      user.store +
      "')";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  getCategoryById: function (user, callback) {
    var sql =
      "select * from category WHERE store='" +
      user.email +
      "' AND id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  updateCategory: function (user, callback) {
    sql =
      "UPDATE category SET category_name='" +
      user.category_name +
      "',category_description='" +
      user.category_drescription +
      "',update_date='" +
      user.last_update +
      "' WHERE id='" +
      user.id +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  deleteCategory: function (user, callback) {
    sql = "DELETE FROM category WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  getSubCategoryById: function (user, callback) {
    var sql =
      "SELECT category.category_name AS categoryname, subcategory.sub_category_name AS subcategoryname, subcategory.creation_date AS creationdate, subcategory.update_date AS updatedate FROM category JOIN subcategory ON category.id = subcategory.category_id WHERE subcategory.store='" +
      user.email +
      "' AND subcategory.id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  updateSubCategory: function (user, callback) {
    sql =
      "UPDATE subcategory SET category_id='" +
      user.category +
      "',sub_category_name='" +
      user.sub_category_name +
      "',update_date='" +
      user.last_update +
      "' WHERE id='" +
      user.id +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  deleteSubCategory: function (user, callback) {
    sql = "DELETE FROM subcategory WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  getAllSubCategoryP: function (user, callback) {
    sql = "SELECT * FROM subcategory WHERE store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  // insertProduct: function (user, callback) {
  //   var sql =
  //     "INSERT INTO products (category_ID, sub_category_ID, product_name, product_brand, product_price, product_discount, product_description, product_image, shipping_cost,product_availability, in_stock, creation_date, store) VALUES ('" +
  //     user.category +
  //     "' , '" +
  //     user.sub_category +
  //     "' , '" +
  //     user.product_name +
  //     "', '" +
  //     user.product_brand +
  //     "', '" +
  //     user.price +
  //     "', '" +
  //     user.product_discount +
  //     "', '" +
  //     user.product_description +
  //     "', '" +
  //     user.uploaded_image.name +
  //     "', '" +
  //     user.shipping_charge +
  //     "', '" +
  //     user.product_availability +
  //     "', '" +
  //     user.product_stock +
  //     "', '" +
  //     user.last_update +
  //     "', '" +
  //     user.email +
  //     "')";
  //   db.execute(sql, function (status) {
  //     callback(status);
  //   });
  // },

  getAllProducts: function (user, callback) {
    var sql =
      "SELECT products.product_name AS productname, products.product_brand AS productbrand, products.product_availability AS productavailability, products.in_stock AS instock, products.product_price AS productprice, products.creation_date AS creationdate ,  products.last_update AS lastupdate,  products.id AS productid ,category.category_name AS categoryname, subcategory.sub_category_name AS subcategoryname FROM products JOIN category ON products.category_ID = category.id JOIN subcategory ON products.sub_category_ID = subcategory.id WHERE products.store='" +
      user.email +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getProductsById: function (user, callback) {
    var sql =
      "SELECT products.product_name AS productname, products.product_brand AS productbrand,products.shipping_cost AS shippingcost,products.product_description AS productdescription, products.product_availability AS productavailability, products.in_stock AS instock, products.product_price AS productprice, products.creation_date AS creationdate ,  products.last_update AS lastupdate,  products.id AS productid ,category.category_name AS categoryname, subcategory.sub_category_name AS subcategoryname FROM products JOIN category ON products.category_ID = category.id JOIN subcategory ON products.sub_category_ID = subcategory.id WHERE products.store='" +
      user.email +
      "' AND products.id='" +
      user.id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  updateProducts: function (user, callback) {
    sql =
      "UPDATE products SET category_ID='" +
      user.category +
      "',sub_category_ID='" +
      user.sub_category +
      "',product_name='" +
      user.product_name +
      "',product_brand='" +
      user.product_brand +
      "',product_price='" +
      user.price +
      "',product_description='" +
      user.product_description +
      "',shipping_cost='" +
      user.shipping_charge +
      "',product_availability='" +
      user.product_availability +
      "',in_stock='" +
      user.product_stock +
      "',last_update='" +
      user.last_update +
      "',product_image='" +
      user.product_image +
      "' WHERE id='" +
      user.id +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  deleteProduct: function (user, callback) {
    sql = "DELETE FROM products WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  register: function (user, callback) {
    var sql =
      "INSERT INTO user (username, password, email, phone, address, type, store_name) VALUES ('" +
      user.username +
      "' , '" +
      user.password +
      "' , '" +
      user.email +
      "', '" +
      user.phone +
      "', '" +
      user.address +
      "', '" +
      user.type +
      "', '" +
      user.store_name +
      "')";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
};
