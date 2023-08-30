const express = require("express");
const router = express.Router();
const { Employee } = require("../../models");

// get information for all employees

//make an employee
router.post("/", async (req, res) => {
  try {
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

// delete employee
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

module.exports = router;