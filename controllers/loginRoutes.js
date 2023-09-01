const router = require("express").Router(); 
const { Employee } = require("../models");

router.post("/", async (req, res) => {
    try {
      // retrieve
      const userData = await Employee.findOne({ where: { username: req.body.username } });
  
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

  
module.exports = router;
