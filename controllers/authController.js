const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    console.log("Register API Hit:", req.body);  // <<== Add this

    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hash });
    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);   // <<== REAL ERROR SHOW
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("LOGIN API Hit:", req.body); // <<== Add this

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);  // <<== REAL ERROR SHOW
    res.status(500).json({ message: "Server error" });
  }
};
