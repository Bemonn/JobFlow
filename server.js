require("dotenv").config();
const express = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies
const session = require("express-session"); // import express-session
const exphbs = require("express-handlebars");
const tasks = require("./controllers/tasksRoutes");
const sequelize = require("./config/connection");

const app = express();

const PORT = 3000;

const hbs = exphbs.create({}).engine;

app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

// Use express-session middleware
app.use(
  session({
    secret: "your_secret_key", // this secret will be used for signing the session ID cookie. Change it to your own secret string.
    resave: false, // force the session to be saved back to the session store
    saveUninitialized: false, // save uninitialized session to the store
    cookie: { secure: "auto" }, // automatically set the cookie as secure if the request is secure
  })
);

// middleware
app.use(express.json());

// Basic server routes
app.get("/", (req, res) => {
  // Counting views for the current session
  req.session.views = (req.session.views || 0) + 1;
  res.send(
    `Hello World! You have viewed this page ${req.session.views} times.`
  );
});

app.use("/tasks", tasks);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
