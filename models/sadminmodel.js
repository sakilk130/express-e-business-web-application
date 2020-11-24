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
  getById: function () {},
  getAll: function (callback) {
    var sql = 'select * from user';
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
  insert: function (user, callback) {
    var sql =
      "insert into shop VALUES ('', '" +
      user.name +
      "' , '" +
      user.location +
      "','" +
      user.phoneno +
      "','" +
      user.category +
      "','" +
      user.email +
      "')";

    //console.log(sql);

    db.execute(sql, function (status) {
      callback(status);
    });
  },
  update: function (user, callback) {
    var sql =
      "UPDATE shop SET id='" +
      user.id +
      "', name='" +
      user.name +
      "',location='" +
      user.location +
      "', phone='" +
      user.phone +
      "',category='" +
      user.category +
      "',email='" +
      user.email +
      "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  delete: function (user, callback) {
    sql = "DELETE FROM shop WHERE id='" + user.id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },
};
