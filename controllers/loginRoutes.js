// This handles the login information for the user
 
const router = require("express").Router();
const { Employee } = require("../models");

// POST /api/user/login

router.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // retrieve
    const userData = await Employee.findOne({
      where: { username: req.body.username },
    });

    // if the user does not exist
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Checking password keyed in against stored hashed password
    const validPassword = await userData.checkPassword(req.body.password);

    //if the password does not match
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // All good on password and user, initiate user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const employeeData = await Employee.findOne({ where: { username } });

//     if (!employeeData || !employeeData.checkPassword(password)) {
//       res.status(400).json({ message: "Incorrect username or password!" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = employeeData.id;
//       req.session.logged_in = true;
//       res.json({ employee: employeeData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// POST /api/user/logout

// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// POST /api/user/signup

module.exports = router;
