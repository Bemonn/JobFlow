const express = require("express");

const router = express.Router();
const { Task } = require("../../models");

// Get information for all tasks
router.get("/tasks", async (req, res) => {
  try {
    const taskData = await Task.findAll();
    if (!taskData) {
      res.status(404).json({ message: "No tasks found!" });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get information for one tasks
router.get("/tasks/:id", async (req, res) => {
  try {
    const taskData = await Task.findOne({
      where: { id: req.params.id },
    });
    if (!taskData) {
      res.status(404).json({ message: `No tasks found with this id: ${req.params.id}!` });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a task
router.post("/tasks", async (req, res) => {
  try {
    const taskData = await Task.create({
      task_name: req.task_name,
      description: req.description,
      deadline: req.deadline,
      status: req.status,
    });
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const taskData = await Task.update(req.body, {
      where: { id: req.params.id },
    }).then((updatedTask) => {
      res.json(updatedTask);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: { id: req.params.id },
    });
    if (!taskData) {
      res.status(404).json({ message: `No tasks found with this id: ${req.params.id}!` });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
