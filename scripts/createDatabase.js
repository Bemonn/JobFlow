const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize('', config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

(async () => {
  await sequelize.query('DROP DATABASE IF EXISTS jobflow;');
  await sequelize.query('CREATE DATABASE jobflow;');
  console.log("Database jobflow created!");
  process.exit(0);
})();