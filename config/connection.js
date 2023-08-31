require("dotenv").config();

// Importing necessary modules from Sequelize package
const Sequelize = require("sequelize");

// If statement for running in heroku (JAWSDB) or locally
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    },
  );
}

// Export the sequelize connection to be used in other parts of the application
module.exports = sequelize;
