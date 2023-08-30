const Employee = require("./Employee");
const Task = require("./Task");
const EmployeeTask = require("./EmployeeTask");
const TaskStatus = require("./TaskStatus");

Employee.belongsToMany(Task, {
  through: EmployeeTask,
  foreignKey: "employee_id",
});
Task.belongsToMany(Employee, { through: EmployeeTask, foreignKey: "task_id" });

// Products belongsTo Category
Task.belongsTo(TaskStatus, {
  foreignKey: "status_id",
});

// Categories have many Products
TaskStatus.hasMany(Task, {
  foreignKey: "status_id",
  onDelete: "SET NULL",
});

module.exports = {
  Employee,
  Task,
  EmployeeTask,
  TaskStatus,
};
