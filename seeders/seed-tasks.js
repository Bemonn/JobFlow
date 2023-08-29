// Import the Task model
const Task = require('../models/Task');

// Sample data for seeding the tasks table
const taskData = [
  {
    description: 'Fix the server bug',
    due_date: '2023-08-28',
    employee_id: 1,
  },
  {
    description: 'Update the landing page',
    due_date: '2023-09-01',
    employee_id: 2,
  },
];

module.exports = {
  // The up method is responsible for seeding data into the Tasks table
  up: async (queryInterface, Sequelize) => {
    await Task.bulkCreate(taskData);
  },

  // Reverses up method removing seeded data from the Tasks table
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
