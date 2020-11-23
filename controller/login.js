const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
const yup = require('yup');

router.get('/', (req, res) => {
  res.render('admin/login');
});

router.post('/', (req, res) => {
  var user = {
    email: req.body.email,
    password: req.body.password,
  };
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

  loginSchema.isValid(user).then(function (valid) {
    if (valid === true) {
      admin_model.validate(user, function (status) {
        console.log(status);
        if (status) {
          res.cookie('uname', req.body.email);
          res.redirect('/admin');
        } else {
          res.send(
            ' <script>alert("User Not found"); window.location.href ="/login";</script>'
          );
        }
      });
    } else {
      console.log('Login Error');
    }
  });
  loginSchema.validate(user).catch(function (err) {
    res.render('admin/error-page/loginErr', { error: err.errors });
  });
});
module.exports = router;
