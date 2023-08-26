// Import necessary dependencies
const db = require('../config/connection');
const { Employee } = require('../models');

// Sample data for seeding the employees table
const employeeData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123', // passwords need to be hashed (should already be working)
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password456',
  },
];

// Async function to seed employees
const seedEmployees = async () => {
  // Sync the model with the database, and recreate tables if they exist.
  // Be cautious with force: true as it will drop tables if they already exist.
  await db.sync({ force: true });

  // Use Sequelize's bulkCreate method to add the sample data to the employees table
  await Employee.bulkCreate(employeeData);

  // Exit the script
  process.exit(0);
};

// Execute the seeding function
seedEmployees();
