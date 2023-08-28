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

const getTask = (req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findOne({_id: id})
        res.status(200).json({ task });
    } catch (error) {
        
    }
    res.json( { id: req.params.id });
};

const updateTask = (req,res) => {
    res.send('update task');
};

const deleteTask = (req,res) => {
    res.send('delete task');
    try {
      const { id } = req.params
    } catch (error) {
        
    }
};

module.exports = {
    getAllTasks, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}