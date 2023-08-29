// Sample data for seeding the employees table
const employeeData = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "password123", // This password should be hashed during creation in the model
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password456",
  },
];

module.exports = employeeData;
