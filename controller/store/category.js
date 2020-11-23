const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();

router.get("/", (req, res) => {

      userModel.getAll(function (result1) {
        userModel.getAllCategory(function (result2) {
          res.render("category", { product: result1, category: result2 });
        });
      });
});

router.get("/:id", (req, res) => {
    var category_id = req.params.id;
    userModel.getAllCategory(function (result2) {
      userModel.getByProductCategory(category_id, function (results) {
        res.render("category", { product: results, category: result2 });
      });
    });
});


module.exports = router;
