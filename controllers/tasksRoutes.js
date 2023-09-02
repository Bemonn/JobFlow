const router = require("express").Router();
const { EmployeeTask, Task, TaskStatus } = require("../models");
const withAuth = require("../utils/auth");

// // Create task
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract task data from the req body
    const {
      task_name,
      description,
      deadline,
      status_id,
      employeeIds,
    } = req.body;

    // Create the task
    const task = await Task.create({
      task_name,
      description,
      deadline,
      status_id,
    });

    // If there are associated employees, create EmployeeTask records
    if (employeeIds && Array.isArray(employeeIds)) {
      const employeeTaskRecords = employeeIds.map((employeeId) => ({
        employee_id: employeeId,
        task_id: task.id,
      }));

      await EmployeeTask.bulkCreate(employeeTaskRecords);
    }

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json(err);
  }
});

// Update a task
router.patch("/:id/status", withAuth, async (req, res) => {
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

// Delete a task
router.delete("/:id", withAuth, async (req, res) => {
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

module.exports = router;
