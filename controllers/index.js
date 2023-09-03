const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const employeeRoutes = require("./employeeRoutes");
const tasksRoutes = require("./tasksRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes.js");

router.use("/", homeRoutes);
router.use("/employees", employeeRoutes);
router.use("/api/tasks", tasksRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);

module.exports = router;
