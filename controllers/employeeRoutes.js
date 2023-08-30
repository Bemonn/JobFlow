const express = require("express");
const router = express.Router();
const { Employee } = require("../../models");

// get information for all employees

router.get("/employees", async (req, res) => {
  try {
    const employeeData = await Employee.findAll();
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get information for one employee

router.get("/employees/:id", async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.params.id);
    if (!employeeData) {
      res.status(404).json({ message: "No employee found with this id!" });
      return;
    }
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete employee

router.delete("/employees/:id", async (req, res) => {
  try {
    const employeeData = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!employeeData) {
      res.status(404).json({ message: "No employee found with this id!" });
      return;
    }
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});
