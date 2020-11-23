const db = require('./db');

module.exports = {
  validate: function (user, callback) {
    var sql =
      "select * from customer where cu_email='" +
      user.cu_email +
      "' and cu_pass='" +
      user.cu_pass +
      "'";
    db.getResults(sql, function (results) {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  getByCustomer: function (id, callback) {
    var sql = "SELECT * FROM customer WHERE cu_email='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByProductCategory: function (user, callback) {
    var sql = "SELECT * FROM products WHERE category_id='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByProduct: function (id, callback) {
    var sql = "SELECT * FROM products WHERE id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getById: function () {},

  getAll: function (user, callback) {
    var sql = "select * from products where store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getAllCategory: function (user, callback) {
    var sql = "select * from category WHERE store='" + user.email + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (user, callback) {
    var cu_name = user.cu_name;
    var cu_email = user.cu_email;
    var cu_pass = user.cu_pass;

    var sql =
      "insert into customer VALUES ('" +
      user.cu_name +
      "' , '" +
      user.cu_email +
      "' , '" +
      user.cu_pass +
      "')";
    // var sql ="INSERT INTO customer ('cu_name','cu_email','cu_pass') VALUES (?,?,?)";

    db.execute(sql, function (status) {
      callback(status);
    });
  },
  // update: function(){

  // },
  // delete: function(){

  // }
};
