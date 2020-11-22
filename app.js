const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const login = require('./controller/login');
const admin = require('./controller/admin');
const logout = require('./controller/logout');
const home = require('./controller/home');
const register = require('./controller/register');
const store = require('./controller/store');
const app = express();

//config
app.set('view engine', 'ejs');
//
// middleware
app.use('/abc', express.static(path.join(__dirname, 'assets')));

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  exSession({
    secret: 'my secret value',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);
app.use('/logout', logout);
app.use('/store', store);

// app.use('/user', user);

//route

app.get('*', (req, res) => {
  res.render('admin/404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
