// This handles the login information for the user

const router = require("express").Router();
const { Employee } = require("../models/Employee");

// POST /api/user/login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employeeData = await Employee.findOne({ where: { email } });

    if (!employeeData || !employeeData.checkPassword(password)) {
      res.status(400).json({ message: "Incorrect email or password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = employeeData.id;
      req.session.logged_in = true;
      res.json({ employee: employeeData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /api/user/logout

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// POST /api/user/signup

router.post("/signup", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      position,
    } = req.body;

    if (password !== confirm_password) {
      res.status(400).json({ message: "Passwords do not match!" });
      return;
    }

    const employeeData = await Employee.create({
      first_name,
      last_name,
      email,
      password,
      position,
    });

    req.session.save(() => {
      req.session.user_id = employeeData.id;
      req.session.logged_in = true;
      res.json(employeeData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
