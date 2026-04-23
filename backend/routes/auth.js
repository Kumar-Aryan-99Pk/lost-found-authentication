const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  console.log("BODY RECEIVED 👉", req.body); // 🔥 ADD THIS

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("USER ALREADY EXISTS ❌");
      return res.status(400).send("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    console.log("USER CREATED ✅");

    res.json(user);

  } catch (err) {
    console.log("ERROR 👉", err);
    res.status(500).send(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Invalid");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;