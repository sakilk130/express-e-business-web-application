const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("customer/registation");
});

router.post('/', (req, res)=>{
 if(req.body.cu_pass == req.body.cu_re_pass){   
    var customer = {
      cu_name	: 	req.body.cu_name,
      cu_email	: 	req.body.cu_email,
      cu_pass	: 	req.body.cu_pass
	};

	userModel.insert(customer, function (status) {
    if (status) {
       var cu_email = req.body.cu_email;
       
       userModel.getCustomerID(cu_email, function (results) {
                
          var customerID = results[0].cu_id;

          res.cookie("customerID", customerID);
          res.redirect("/home");

      });
    } else {
      res.redirect("/registration");
    }
  });
}else{

}

// res.send(customer);
  
  

});


module.exports = router;