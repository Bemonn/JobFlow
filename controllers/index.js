const router = require("express").Router();

const employeeRoutes = require("./employeeRoutes");
const tasksRoutes = require("./tasksRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/employees", employeeRoutes);
//router.use("/tasks", tasksRoutes);
router.use("/", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/tasks", homeRoutes);

module.exports = router;
