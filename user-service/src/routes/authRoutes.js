const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  
const logEvent = require("../services/auditClient");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "USER",
    });

    await logEvent({
      action: "REGISTER",
      userId: user._id,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await logEvent({
      action: "LOGIN",
      userId: user._id,
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET USERS (ADMIN ONLY)
router.get("/users", auth, authorize("ADMIN"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;