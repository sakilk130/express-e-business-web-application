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
};
