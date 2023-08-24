const express = require("express");

const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Basic server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
