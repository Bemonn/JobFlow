const express = require("express");

const router = express.Router();
const { Task, EmployeeTask, Employee, TaskStatus } = require("../../models");

// // Get information for all tasks
router.get("/", async (req, res) => {
  try {
    const tasksData = await Task.findAll({
      include: [
        {
          model: TaskStatus,
        },
        { model: Employee, through: EmployeeTask, as: "task_employees" },
      ],
    });
    if (!tasksData) {
      res.status(404).json({ message: "No tasks found!" });
      return;
    }

    // const tasks = tasksData.map((task) => task.get({ plain: true }));

    res.status(200).json(tasksData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get information for one tasks
router.get("/:id", async (req, res) => {
  try {
    const taskData = await Task.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: TaskStatus,
        },
        { model: Employee, through: EmployeeTask, as: "task_employees" },
      ],
    });
    if (!taskData) {
      res
        .status(404)
        .json({ message: `No tasks found with this id: ${req.params.id}!` });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a task
router.post("/", async (req, res) => {
  try {
    const taskData = await Task.create({
      task_name: req.body.task_name,
      description: req.body.description,
      deadline: req.body.deadline,
      status_id: req.body.status_id,
    });

    if (req.body.employeeIds.length) {
      const taskEmployeeArr = req.body.employeeIds.map((employeeId) => {
        return {
          employee_id: employeeId.employee_id,
          task_id: taskData.id,
        };
      });
      res.status(200).json(await EmployeeTask.bulkCreate(taskEmployeeArr));
    } else {
      res.status(200).json(taskData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Create task
// router.post("/", async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// });

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedRows = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows[0] === 0) {
      res.status(404).json({ message: "No task found with this id!" });
      return;
    }

    if (req.body.employeeIds) {
      const newTaskEmployeeArr = req.body.employeeIds.map((employeeId) => {
        return {
          employee_id: employeeId.employee_id,
          task_id: req.params.id,
        };
      });

      const taskEmployees = await EmployeeTask.findAll({
        where: { task_id: req.params.id },
      });
      const taskEmployeesID = taskEmployees.map(
        (employee_task) => employee_task.id,
      );

      await EmployeeTask.destroy({ where: { id: taskEmployeesID } });

      res.status(200).json(await EmployeeTask.bulkCreate(newTaskEmployeeArr));
    } else {
      res.status(200).json({ message: "Task updated successfully!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.put("/:id", async (req, res) => {
//   try {
//     const taskData = await Task.update(req.body, {
//       where: { id: req.params.id },
//     }).then((updatedTask) => {
//       res.json(updatedTask);
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Update task
// router.patch("/:id", async (req, res) => {
//   try {
//     res.status(200).json({ msg: "Update logic needed" });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// });

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: { id: req.params.id },
    });
    if (!taskData) {
      res
        .status(404)
        .json({ message: `No tasks found with this id: ${req.params.id}!` });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Delete task
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleteData = await Task.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });
//     if (!deleteData) {
//       res.status(404).json({ message: "No task found with this id!" });
//       return;
//     }
//     res.status(200).json(deleteData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
