const express = require('express');
const router = express.Router();
const admin_model = require.main.require('./models/admin_model');
const yup = require('yup');

router.get('/', (req, res) => {
  res.render('Register');
});

router.post('/', (req, res) => {
  var user = {
    store_name: req.body.store_name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    type: 'admin',
  };
  const registerSchema = yup.object().shape({
    store_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().min(11).max(11).required(),
    address: yup.string().required(),
    password: yup.string().min(4).required(),
  });
  registerSchema.isValid(user).then(function (valid) {
    if (valid === true) {
      admin_model.register(user, function (status) {
        console.log(user);
        if (status) {
          res.send(
            '<script>alert("Registration Successful"); window.location.href ="/login"; </script>'
          );
        } else {
          res.send(
            '<script>alert("Registration Successful"); window.location.href ="/register";</script>'
          );
        }
      });
    } else {
      console.log('Registration Error');
    }
  });

  registerSchema.validate(user).catch(function (err) {
    res.render('registerErr', { error: err.errors });
  });
});

module.exports = router;
