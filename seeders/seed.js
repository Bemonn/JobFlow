const sequelize = require("../config/connection");
const { Employee, Task, EmployeeTask, TaskStatus } = require("../models");

const employeesSeed = require("./seed-employees");
const tasksSeed = require("./seed-tasks");
const employeeTaskSeed = require("./seed-employee-tasks"); // Import the new seed data
const taskStatusSeed = require("./seed-taskStatus");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await TaskStatus.bulkCreate(taskStatusSeed);
  await Employee.bulkCreate(employeesSeed);
  await Task.bulkCreate(tasksSeed);
  await EmployeeTask.bulkCreate(employeeTaskSeed); // Seed the many-to-many relationships

  console.log("Finished Seeding Database");
  process.exit(0);
};

seedDatabase();
