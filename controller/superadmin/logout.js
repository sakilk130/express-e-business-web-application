const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = null;
	res.clearCookie('email');
	res.redirect('/superadminlogin');
})

module.exports = router;