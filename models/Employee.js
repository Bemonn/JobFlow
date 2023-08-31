// Importing required modules from Sequelize package
const { Model, DataTypes } = require("sequelize");

// Importing database connection from configuration
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Importing bcrypt for password hashing
// Defining our Employee model by extending the built-in Model class of Sequelize
class Employee extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing the model's data structures and configurations
Employee.init(
  {
    // Defining an ID column as a primary key, that auto-increments
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column for employee's first name
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for employee's last name
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for employee's email with validation to ensure it's in email format
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Column for employee's hashed password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for employee's position or role
    position: {
      type: DataTypes.STRING,
    },
    // Column for employee's profile picture url
    profile_pic_link: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (newEmployeeData) => {
        newEmployeeData.password = await bcrypt.hash(
          newEmployeeData.password,
          10,
        );
        return newEmployeeData;
      },
      beforeUpdate: async (updatedEmployeeData) => {
        updatedEmployeeData.password = await bcrypt.hash(
          updatedEmployeeData.password,
          10,
        );
        return updatedEmployeeData;
      },
    },
    // Using the established database connection for this model
    sequelize,
    // Enabling timestamps for automatic `created_at` and `updated_at` fields
    timestamps: true,
    // Ensuring the model name remains unchanged in database tables
    freezeTableName: true,
    // Using underscores instead of camel-casing for field names
    underscored: true,
    // Defining the name of this model
    modelName: "employee",
  },
);

// Exporting the model for use in other parts of the application
module.exports = Employee;
