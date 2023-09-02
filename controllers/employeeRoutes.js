const express = require("express");

const router = express.Router();
const { EmployeeTask, Task, TaskStatus, Employee } = require("../models");
const withAuth = require("../utils/auth");

// Make an employee
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(11);

    const employeeData = await Employee.create(req.body);

    req.session.save(() => {
      req.session.user_id = employeeData.id;
      req.session.logged_in = true;

      res.status(200).json(employeeData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
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

//Update an employee
router.put("/:id", async (req, res) => {
  try {
    const employeeData = await Employee.update(
      {
        profile_pic_link: req.body.url,
      },
      {
        where: { id: req.params.id },
      },
    ).then((updatedEmployee) => {
      res.json(updatedEmployee);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
