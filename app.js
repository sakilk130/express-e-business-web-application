const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

//config
app.set('view engine', 'ejs');

// middleware
app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  exSession({
    secret: 'my secret value',
    saveUninitialized: true,
    resave: false,
  })
);

// app.use(cookieParser());
// app.use('/login', login);
// app.use('/home', home);
// app.use('/logout', logout);
// app.use('/user', user);

//route
app.get('/', (req, res) => {
  res.send('Hello from express server');
});

app.get('*', (req, res) => {
  res.send('404 not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});