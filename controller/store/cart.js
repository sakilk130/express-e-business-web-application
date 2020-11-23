const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();

router.post("/:id", (req, res) => {
    var product_id = req.params.id;

    userModel.getByProduct(product_id, function (result1) {
        res.render("cart", { product_id: result1});
    });

  });

// router.get("/product/:id", (req, res) => {
//   res.send("ok");
// });

module.exports = router;
