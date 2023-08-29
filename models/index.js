const Employee = require("./Employee");
const Task = require("./Task");
const EmployeeTask = require("./EmployeeTask");

Employee.belongsToMany(Task, {
  through: EmployeeTask,
  foreignKey: "employee_id",
});
Task.belongsToMany(Employee, { through: EmployeeTask, foreignKey: "task_id" });

module.exports = {
  Employee,
  Task,
  EmployeeTask,
};
