const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// CRUD Functions

router.get("/", async (req, res) => {
  try {
    res.render("teamTaskBoard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    res.status(200).json({ msg: "Update logic needed" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteData = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deleteData) {
      res.status(404).json({ message: "No task found with this id!" });
      return;
    }
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Route declarations

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
