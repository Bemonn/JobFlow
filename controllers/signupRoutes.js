const router = require("express").Router();
const { Employee } = require("../models");

router.post("/", async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            username,
            password,
            confirm_password,
            position,
        } = req.body;

        // Confirming if user keyed in the same password twice
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        // Check if the username already exists in the database
        const existingEmployee = await Employee.findOne({
            where: { username: username },
        });

        if (existingEmployee) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        // Create a new employee if the username is unique
        await Employee.create({
            first_name,
            last_name,
            username,
            password,
            position,
        });

        return res.status(201).json({ message: "New user has been created" });

    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;