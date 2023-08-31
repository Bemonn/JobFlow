// This handles the login information for the user

const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Employee } = require("../../models");

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
  // Retriving user input from the signup form
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      confirm_password,
      position,
    } = req.body;

    //Confirming if user keyed in the same password twice 
    if (password !== confirm_password) {
      res.status(400).json({ message: "Passwords do not match!" });
      return;
    }
    // Hashing for password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      position,
    });
    res.status(201).json({ message: "New User has been made" })
    // req.session.save(() => {
    //   req.session.user_id = employeeData.id;
    //   req.session.logged_in = true;
    //   res.json(employeeData);
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
