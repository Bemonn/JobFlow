// WORKING!

const router = require("express").Router();
const { Employee } = require("../models");

// Render signup handlebars
router.get("/", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // Retriving user input from the signup form
  try {
    const { first_name, last_name, username, password, position } = req.body;
    const existingUser = await Employee.findOne({ where: { username } });

    if (existingUser) {
      res.status(400).json({ message: "Username already exists!" });
      return;
    }
    const newEmployee = await Employee.create({
      first_name,
      last_name,
      username,
      password,
      position,
    });

    const employeeData = newEmployee.get({ plain: true });

    console.log(employeeData);

    req.session.save(() => {
      req.session.user_id = employeeData.id;
      req.session.logged_in = true;
      console.log("saved session");
    });

    res.status(200).json(newEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
