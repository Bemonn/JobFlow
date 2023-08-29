const sequelize = require("../config/connection");
const { Employee, Task } = require("../models");

const employeesSeed = require("./seed-employees");
const tasksSeed = require("./seed-tasks");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Employee.bulkCreate(employeesSeed);
  await Task.bulkCreate(tasksSeed);
  console.log("Finished Seeding Database");
  process.exit(0);
};

seedDatabase();
