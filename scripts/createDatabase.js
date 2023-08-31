require("dotenv").config();

const { Sequelize } = require("sequelize");
const config = require("../config/connection");

const sequelize = new Sequelize(
  "",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  },
);

(async () => {
  await sequelize.query("DROP DATABASE IF EXISTS jobflow;");
  await sequelize.query("CREATE DATABASE jobflow;");
  console.log("Database jobflow created!");
  process.exit(0);
})();
