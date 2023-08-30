const router = require("express").Router();

const apiRoutes = require("./api");
// const homeRoutes = require("./home-routes");
const tasksRoutes = require("./tasksRoutes");
const userRoutes = require("./userRoutes");

router.use("/", tasksRoutes);
router.use("/user", userRoutes);

router.use("/api", apiRoutes);

module.exports = router;
