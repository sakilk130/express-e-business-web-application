const db = require('./db');

module.exports = {
  validate: function (user, callback) {
    var sql =
      "select * from customers where email='" +
      user.cu_email +
      "' and password	='" +
      user.cu_pass +
      "'";

    console.log(sql);
    db.getResults(sql, function (results) {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  // customer..........start

  insert: function (user, callback) {
    var sql =
      "INSERT INTO customer (cu_name, cu_email, cu_pass) VALUES ('" +
      user.cu_name +
      "', '" +
      user.cu_email +
      "', '" +
      user.cu_pass +
      "')";
    // var sql ="INSERT INTO customer ('cu_name','cu_email','cu_pass') VALUES (?,?,?)";
    // console.log(sql)

    db.execute(sql, function (status) {
      callback(status);
    });
  },

  getByCustomer: function (id, callback) {
    var sql = "SELECT * FROM customers WHERE id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getCustomerID: function (id, callback) {
    var sql = "SELECT id FROM customers WHERE id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  // customerr-----end

  // product......start
  getProductCondition: function (id, callback) {
    var sql = "SELECT * FROM products WHERE id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByProductCategory: function (id, callback) {
    var sql = "SELECT * FROM products WHERE category_id='" + id + "'";
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

  getAll: function (callback) {
    var sql = 'select * from products';
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  // product......end;

  // Cart......start
  getCartList: function (id, callback) {
    var sql = "SELECT * FROM cart WHERE cu_id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByCart: function (id, callback) {
    var sql =
      "SELECT * FROM cart ca join products p on ca.id = p.id WHERE ca.cu_id='" +
      id +
      "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insertCart: function (user, callback) {
    var sql =
      'INSERT INTO cart (cu_id, id, quantity) VALUES (' +
      user.cu_id +
      ', ' +
      user.product_id +
      ', ' +
      user.quantity +
      ')';
    // var sql ="INSERT INTO customer ('cu_name','cu_email','cu_pass') VALUES (?,?,?)";
    console.log(sql);

    db.execute(sql, function (status) {
      callback(status);
    });
  },

  deleteCart: function (id, callback) {
    var sql = 'DELETE FROM cart WHERE cart_id=' + id;

    // console.log(sql)
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  // Cart......end

  // catagory.......
  getAllCategory: function (callback) {
    var sql = 'select * from category';
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getBySubcategory: function (id, callback) {
    var sql = "SELECT * FROM subcategory WHERE category_id='" + id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  // order
  orders: function (user, callback) {
    var sql =
      'INSERT INTO orders (customer_id, product_id, quantity , order_date, status, store) VALUES (' +
      user.cu_id +
      ', ' +
      user.id +
      ', ' +
      user.quantity +
      ',' +
      user.order_date +
      ", '" +
      user.order_status +
      "','" +
      user.store +
      "')";
    // var sql ="INSERT INTO customer ('cu_name','cu_email','cu_pass') VALUES (?,?,?)";
    // console.log(sql)
    console.log(sql);
    db.execute(sql, function (status) {
      callback(status);
    });
  },
  // update: function(){

  // },
  // delete: function(){

  // }
};
