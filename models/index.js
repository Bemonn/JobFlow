const Employee = require("./Employee");
const Task = require("./Task");

Employee.hasMany(Task, { foreignKey: "assigned_to" });
Task.belongsTo(Employee, { foreignKey: "assigned_to" });

// Task.belongsToMany(Employee, {
//   through: EmployeeTask,
//   foreignKey: "task_id",
// });

module.exports = {
  Employee,
  Task,
};
