const router = require("express").Router(); 
const { Employee } = require("../models");

router.post("/", async (req, res) => {
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
  
      const newEmployee = await Employee.create({
        first_name,
        last_name,
        username,
        password,
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