const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var uuid = require('uuid');
const path = require('path');
const login = require('./controller/login');
const admin = require('./controller/admin');
const logout = require('./controller/logout');
const app = express();

//config
app.set('view engine', 'ejs');
//
// middleware
app.use('/abc', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  exSession({
    secret: 'my secret value',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(fileUpload());
app.use(cookieParser());
app.use('/', login);
app.use('/admin', admin);
app.use('/logout', logout);

// app.use('/user', user);

//route

app.get('*', (req, res) => {
  res.send('404 not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
