const express = require('express');
const session = require('express-session'); // import express-session

const app = express();
const PORT = 3000;
const exphbs = require('express-handlebars');
const { Sequelize } = require('sequelize');
const config = require('./config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Use express-session middleware
app.use(session({
  secret: 'your_secret_key', // this secret will be used for signing the session ID cookie. Change it to your own secret string.
  resave: false, // force the session to be saved back to the session store
  saveUninitialized: false, // save uninitialized session to the store
  cookie: { secure: 'auto' }, // automatically set the cookie as secure if the request is secure
}));

// Basic server
app.get('/', (req, res) => {
  // Counting views for the current session
  req.session.views = (req.session.views || 0) + 1;
  res.send(`Hello World! You have viewed this page ${req.session.views} times.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
