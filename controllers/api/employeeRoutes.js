const express = require("express");

const router = express.Router();
const { Employee } = require("../../models");

// // get information for all employees

router.get("/", async (req, res) => {
  try {
    const employeeData = await Employee.findAll({});
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get information for one employee

// router.get("/:id", async (req, res) => {
//   try {
//     const employeeData = await Employee.findByPk(req.params.id);
//     if (!employeeData) {
//       res.status(404).json({ message: "No employee found with this id!" });
//       return;
//     }
//     res.status(200).json(employeeData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Make an employee
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
