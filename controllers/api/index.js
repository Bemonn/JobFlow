const router = require("express").Router();

const employeeRoutes = require("./employeeRoutes");
const tasksRoutes = require("./tasksRoutes");
const userRoutes = require("./userRoutes");

router.use("/employees", employeeRoutes);
router.use("/tasks", tasksRoutes);
router.use("/user", userRoutes);

module.exports = router;
