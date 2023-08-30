const Employee = require("./Employee");
const Task = require("./Task");
const EmployeeTask = require("./EmployeeTask");
const TaskStatus = require("./TaskStatus");

// Products belongsTo Category
Task.belongsTo(TaskStatus, {
  foreignKey: "status_id",
});

// Categories have many Products
TaskStatus.hasMany(Task, {
  foreignKey: "status_id",
  onDelete: "SET NULL",
});

Employee.belongsToMany(Task, {
  through: {
    model: EmployeeTask,
    unique: false,
  },
  as: "employee_tasks",
  // foreignKey: "employee_id",
});

Task.belongsToMany(Employee, {
  through: {
    model: EmployeeTask,
    unique: false,
  },
  as: "task_employees",
  // foreignKey: "task_id",
});

module.exports = {
  Employee,
  Task,
  EmployeeTask,
  TaskStatus,
};
