// Import the Employee model
const Employee = require('../models/Employee');

// Sample data for seeding the employees table
const employeeData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123', // This password should be hashed during creation in the model
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password456',
  },
];

module.exports = {
  // The up method is responsible for seeding data into the Employees table
  up: async (queryInterface, Sequelize) => {
    await Employee.bulkCreate(employeeData);
  },

  // Reverses up method removing seeded data from the employee table
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};