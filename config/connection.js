// Importing necessary modules from Sequelize package
const Sequelize = require('sequelize');

// Importing our database configurations
const env = process.env.NODE_ENV || 'development'; // Determine environment
const config = require('./config.json')[env]; // Import the config.json and select the correct environment configuration

// Setting up the Sequelize connection to the database
let sequelize;

// If statement for running in heroku (JAWSDB) or locally
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306, // default MySQL port
    logging: false, // set to 'true' to view SQL queries in the console
  });
}

// Export the sequelize connection to be used in other parts of the application
module.exports = sequelize;
