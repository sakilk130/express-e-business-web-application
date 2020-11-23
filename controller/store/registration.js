const express = require("express");
const userModel = require.main.require("./models/userModel");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("customer/registation");
});

router.post('/', (req, res)=>{
    
    var customer = {
      cu_name	: 	req.body.cu_name,
      cu_email	: 	req.body.cu_email,
      cu_pass	: 	req.body.cu_pass
	};

	userModel.insert(customer, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.redirect('/registration');
		}
  });

// res.send(customer);
  
  

});


module.exports = router;