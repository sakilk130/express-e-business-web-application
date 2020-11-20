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
};
