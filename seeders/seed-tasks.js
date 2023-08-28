// Import necessary dependencies
const db = require('../config/connection');
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

// Async function to seed tasks
const seedTasks = async () => {
  // Sync the model with the database, and recreate tables if they exist
  // CAUTION with force: true as it will drop tables if they already exist
  await db.sync({ force: true });

  // Use Sequelize's bulkCreate method to add the sample data to the tasks table
  await Task.bulkCreate(taskData);

  // Exit the script
  process.exit(0);
};

// Execute the seeding function
seedTasks();
