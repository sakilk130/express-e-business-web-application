const express = require('express');
const sadminmodel = require.main.require('./models/sadminmodel');
const router = express.Router();

router.get('/add', (req, res) => {
  res.render('superadmin/shop/add');
});

router.post('/add', (req, res) => {
  var user = {
    name: req.body.name,
    location: req.body.location,
    phoneno: req.body.phoneno,
    category: req.body.category,
    email: req.body.email,
  };

  sadminmodel.insert(user, function (status) {
    if (status) {
      res.redirect('/dash/shoplist');
    } else {
      res.redirect('shop/add');
    }
  });
});

router.get('/edit/:id', (req, res) => {
  /*var data = req.params.id;
	res.send(data);
	/*var user ={
		id: req.params.id,
		username: 'alamin',
		password: '123',
		email: 'alamin@gmail.com',
		dept: 'CS'
	};*/

  res.render('superadmin/shop/edit');
});

router.post('/edit/:id', (req, res) => {
  var user = {
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    phoneno: req.body.phoneno,
    category: req.body.category,
    email: req.body.email,
  };

  sadminmodel.update(user, function (status) {
    if (status) {
      res.redirect('/dash/shoplist');
    } else {
      res.redirect('shop/edit');
    }
  });
});

/*router.post('/edit/:id', (req, res)=>{

	req.body.name
	req.body.email
	req.body.password
	req.body.dept

	res.redirect('/dash/shoplist');
})*/

router.get('/delete/:id', (req, res) => {
  /*var user ={
		id: req.params.id,
		username: 'alamin',
		password: '123',
		email: 'alamin@gmail.com',
		dept: 'CS'
	};*/

  res.render('shop/delete');
});

router.post('/delete/:id', (req, res) => {
  //delete from DB
  var user = {
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    phoneno: req.body.phoneno,
    category: req.body.category,
    email: req.body.email,
  };

  sadminmodel.delete(user, function (status) {
    if (status) {
      res.redirect('/dash/shoplist');
    } else {
      res.send('Delete failed');
    }
  });
  //res.redirect('/home/userlist');
});

module.exports = router;
