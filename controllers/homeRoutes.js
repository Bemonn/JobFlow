const router = require("express").Router();
const { Employee, EmployeeTask, Task, TaskStatus } = require("../models");
// const withAuth = require("../utils/auth");

//Getting all Task
// router.get("/", async (req, res) => {
//   try {
//     // Get all Task and JOIN with user data
//     const tasksData = await Task.findAll({
//       include: [
//         // {
//         //   model: Employee,
//         //   attributes: ["first_name", "last_name"],
//         // },
//         {
//           model: TaskStatus,
//         },
//         { model: Employee, through: EmployeeTask, as: "task_employees" },
//       ],
//     });

//     // Serialize data so the template can read it
//     const tasks = tasksData.map((task) => task.get({ plain: true }));
//     // console.log(tasks[0]);
//     // Pass serialized data and session flag into template
//     // Specify the layout template
//     res.render("main", {
//       tasks,
//       logged_in: req.session.logged_in,
//     }, { layout: "layouts/main" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     res.render("login");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//Home page that goes straight to login
router.get("/", async (req, res) => {
  try {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect("/tasks");
      return;
    }

    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

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

//All task
router.get("/tasks", async (req, res) => {
  try {
    const tasksData = await Task.findAll({
      include: [
        {
          model: TaskStatus,
        },
        { model: Employee, through: EmployeeTask, as: "task_employees" },
      ],
    });

    const tasks = tasksData.map((task) => task.get({ plain: true }));
    console.log(tasks);
    res.render("teamTaskBoard", {
      tasks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Individual task
router.get("/tasks/:id", async (req, res) => {
  try {
    const tasksData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: TaskStatus,
        },
        { model: Employee, through: EmployeeTask, as: "task_employees" },
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

// Update a tasks status
// (Uses the TaskStatus table to change the assigned id of task status in the Tasks table, insomnia PATCH http://localhost:3000/tasks/1/status)
// JSON
// {
//  "status_name": "Completed"    (/models TaskStatus.js for other task statuses)
// }
router.patch("/tasks/:id/status", async (req, res) => {
  try {
    const statusData = await TaskStatus.findOne({
      where: {
        status_name: req.body.status_name,
      },
    });

    if (!statusData) {
      return res.status(404).json({ message: "Status not found!" });
    }

    const statusId = statusData.id;

    // Update the task with the new status ID
    const [numberOfAffectedRows] = await Task.update(
      { status_id: statusId },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    if (numberOfAffectedRows === 0) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json({ message: "Task status updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task status.", error: error.message });
  }
});

// router.get("/employees/", async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const employeeData = await Employee.findAll(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Employee }],
//     });

//     if (!employeeData) {
//       res.status(404).json({ message: "No employee found with this id!" });
//       return;
//     }
//     const employee = employeeData.get({ plain: true });

//     res.render("employees", {
//       ...employee,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get information for all employees
router.get("/employees/", async (req, res) => {
  try {
    // Find all employees
    const employeesData = await Employee.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!employeesData || employeesData.length === 0) {
      res.status(404).json({ message: "No employees found!" });
      return;
    }

    const employees = employeesData.map((employee) =>
      employee.get({ plain: true }),
    );

    res.render("employees", {
      employees,
      logged_in: req.session.logged_in,
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
// router.get("/employees/:id", async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const employeeData = await Employee.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Employee }],
//     });

//     if (!employeeData) {
//       res.status(404).json({ message: "No employee found with this id!" });
//       return;
//     }
//     const employee = employeeData.get({ plain: true });

//     res.render("employee", {
//       ...employee,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/employees/:id", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const employeeData = await Employee.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!employeeData) {
      res.status(404).json({ message: "No employee found with this id!" });
      return;
    }

    const employee = employeeData.get({ plain: true });

    res.render("employees", {
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
