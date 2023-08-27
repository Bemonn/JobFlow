// This handles the login information for the user

const router = require("express").Router();
const { Employee } = require("../../models");

// POST /api/user/login

router.post("/login", async (req, res) => {
  try {
    const userData = await Employee.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
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
    const { username, password, confirmPassword } = req.body;
    // Check if user exists
    const userData = await Employee.findOne({
      where: { username },
    });
    if (userData) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }
    // Create new user
    const newUser = await Employee.create({
      username,
      password,
    });
    // Save session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
