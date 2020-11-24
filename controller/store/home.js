const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies['customerID'] != null) {
    var customerID = req.cookies['customerID'];

    // userModel.getByCustomer(customerID, function (result1) {
    //   userModel.getAll(function (result2) {
    //     userModel.getAllCategory(function (result3) {
    //       userModel.getBySubcategory(result3, function (result4) {
    //         res.render("home", {
    //           customer: result1,
    //           product: result2,
    //           category: result3,
    //           subCategory: result4
    //         });
    //       });
    //     });
    //   });
    // });
    console.log(customerID);
    userModel.getByCustomer(customerID, function (result1) {
      userModel.getAll(function (result2) {
        userModel.getAllCategory(function (result3) {
          res.render('store/home', {
            customer: result1,
            product: result2,
            category: result3,
          });
        });
      });
    });
  } else {
    res.redirect('/clogin');
  }
});

// router.get("/product/:id", (req, res) => {
//   res.send("ok");
// });

module.exports = router;
