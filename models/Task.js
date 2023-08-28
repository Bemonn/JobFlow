// Importing required modules from Sequelize package
const { Model, DataTypes } = require('sequelize');

// Importing database connection from configuration
const sequelize = require('../config/connection');

// Defining our Task model by extending the built-in Model class of Sequelize
class Task extends Model {}

// Initializing the model's data structures and configurations
Task.init(
  {
    // Defining an ID column as a primary key, uses auto-increments
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column for task's name or title
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for a detailed description of the task
    description: {
      type: DataTypes.TEXT,
    },
    // Column for task's deadline
    deadline: {
      type: DataTypes.DATE,
    },
    // Foreign key column linking this task to an employee
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employee', // Refers to the Employee model
        key: 'id', // Using the id field of the Employee model
      },
    },
    // Column to indicate the current status of the task with a default value of 'Pending'
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    // Using the established database connection for this model
    sequelize,
    // Enabling timestamps for automatic `created_at` and `updated_at` fields
    timestamps: true,
    // Ensuring the model name remains unchanged in database tables
    freezeTableName: true,
    // Using underscores instead of camel-casing for field names
    underscored: true,
    // Defining the name of this model
    modelName: 'task',

    // Sets the table name
    tableName: 'tasks',
  },
);

// Exporting the model for use in other parts of the application
module.exports = Task;
