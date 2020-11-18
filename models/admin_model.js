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
};
