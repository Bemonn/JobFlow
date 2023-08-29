const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class EmployeeTask extends Model {}

EmployeeTask.init(
  {
    // Define an ID column as a primary key, that auto-increments
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id",
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "task",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "employee_task",
  }
);

module.exports = EmployeeTask;
