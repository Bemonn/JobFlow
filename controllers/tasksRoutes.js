const express = require('express');
const router = express.Router();

//getting all task
const Task = require('../models/Task');

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.findAll;
        res.status(201).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
};

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
};

const getTask = async (req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findOne({_id: taskID});
        res.status(200).json({ task });
        if(!task){
        return res.status(404).json({msg: `No task with thisid : ${taskID}`});
    }
        res.status(200).json({ task });
    }   catch (error) {
        res.status(500).json({ msg:error });
    }
};

const updateTask = (req,res) => {
    res.send('update task');
};

router.delete('/:id', async (req, res) => {
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
    

module.exports = {
    getAllTasks, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}




//importing from controller CRUD 
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasksRoutes');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;