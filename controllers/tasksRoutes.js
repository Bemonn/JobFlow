const express = require('express');
const router = express.Router();

const { Task } = require("../../models");

//Getting all task
router.get("/tasks", async (req, res)=> {
    const { TaskId } = req.params.id;
  
    Task.findAll({
      where: {
        TaskId: TaskId,
      },
      order: [["deadline", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "task_name", "deadline", "assigned_to"],
        },
      ],
      order: [["deadline", "ASC"]],
    })
      .then((task) => {
        res.status(201).json({ tasks });
      })
      .catch((err) =>
        res.status(500).send({
          err,
        })
      );
  }); 

//Create a task
router.post("/tasks", async (req, res) => {
    try {
      const {
        id,
        task_name,
        description,
        deadline,
        assigned_to,
        status,
      } = req.body;
      if (!req.session.logged_in = true) {
        res.status(400).json({ message: "You must be logged in" });
        return;
      }
      const taskData = await Task.create(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//Get specific task by id
router.get("/tasks/:id", async (req, res) => {
    try {
      const taskData = await Task.findByPk(req.params.id);
      if (!taskData) {
        res.status(404).json({ message: "No task found with this id!" });
        return;
      }
      res.status(200).json(taskData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//update a task
router.patch('/tasks/:id', async (req, res) => {
    try {
        const updateData = await Task.update({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
        if (!updateData) {
          res.status(404).json({ message: 'No task found with this id!' });
          return;
        }
        res.status(200).json(updateData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deleteData = await Task.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
        if (!deleteData) {
          res.status(404).json({ message: 'No task found with this id!' });
          return;
        }
        res.status(200).json(deleteData);
      } catch (err) {
        res.status(500).json(err);
      }
});
    

module.exports = router;