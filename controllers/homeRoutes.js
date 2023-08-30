const router = require("express").Router();
const { Employee, EmployeeTask, Task, TaskStatus } = require("../models");
// const withAuth = require("../utils/auth");

//Getting all Task
router.get("/", async (req, res) => {
  try {
    // Get all Task and JOIN with user data
    const tasksData = await Task.findAll({
      include: [
        {
          model: Employee,
          attributes: ["first_name"],
          attributes: ["last_name"],
        },
        {
          model: TaskStatus,
        },
      ],
    });

    // Serialize data so the template can read it
    const tasks = tasksData.map((task) => task.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("teamTaskBoard", {
      tasks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     res.render("teamTaskBoard");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.findAll();
//     res.status(200).json({ tasks });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// router.route("/").get(getAllTasks).post(createTask);
// router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

//Individual task
router.get("/tasks/:id", async (req, res) => {
  try {
    const tasksData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: Employee,
          attributes: ["name"],
        },
      ],
    });

    const task = tasksData.get({ plain: true });

    res.render("teamTaskBoard", {
      ...task,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get information for all employees
router.get("/employees/", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const employeeData = await Employee.findAll(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Employee }],
    });

    if (!employeeData) {
      res.status(404).json({ message: "No employee found with this id!" });
      return;
    }
    const employee = employeeData.get({ plain: true });

    res.render("employee", {
      ...employee,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get information for all employees

// router.get("/employees", async (req, res) => {
//   try {
//     const employeeData = await Employee.findAll();
//     res.status(200).json(employeeData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // get information for one employee

// router.get("/employees/:id", async (req, res) => {
//   try {
//     const employeeData = await Employee.findByPk(req.params.id);
//     if (!employeeData) {
//       res.status(404).json({ message: "No employee found with this id!" });
//       return;
//     }
//     res.status(200).json(employeeData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// WE NEED TO MAKE SINGLE EMPLOYEE PROFILE PAGE
// Get information for one employee
// Use withAuth middleware to prevent access to route
router.get("/employees/:id", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const employeeData = await Employee.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Employee }],
    });

    if (!employeeData) {
      res.status(404).json({ message: "No employee found with this id!" });
      return;
    }
    const employee = employeeData.get({ plain: true });

    res.render("employee", {
      ...employee,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/employees");
    return;
  }

  res.render("login");
});

//signup page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/employees");
    return;
  }

  res.render("signup");
});

module.exports = router;
