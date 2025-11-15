#!/usr/bin/env bash
set -e

echo "Adding Edit/Delete APIs for PetrolPump, Labor, and User Profile..."

# ======================================
# controllers/petrolPumpController.js
# ======================================
cat > controllers/petrolPumpController.js <<'JS'
const PetrolPump = require("../models/PetrolPump");
const Labor = require("../models/Labor");

// Update PetrolPump
exports.updatePump = async (req, res) => {
  try {
    const pump = await PetrolPump.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pump) return res.status(404).json({ message: "Pump not found" });
    res.json(pump);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete PetrolPump
exports.deletePump = async (req, res) => {
  try {
    const pump = await PetrolPump.findByIdAndDelete(req.params.id);
    if (!pump) return res.status(404).json({ message: "Pump not found" });
    // Also delete related labors
    await Labor.deleteMany({ petrolPump: req.params.id });
    res.json({ message: "Pump and related labors deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Labor
exports.updateLabor = async (req, res) => {
  try {
    const labor = await Labor.findByIdAndUpdate(
      req.params.laborId,
      req.body,
      { new: true }
    );
    if (!labor) return res.status(404).json({ message: "Labor not found" });
    res.json(labor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Labor
exports.deleteLabor = async (req, res) => {
  try {
    const labor = await Labor.findByIdAndDelete(req.params.laborId);
    if (!labor) return res.status(404).json({ message: "Labor not found" });
    res.json({ message: "Labor deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
JS

# ======================================
# controllers/profileController.js
# ======================================
cat > controllers/profileController.js <<'JS'
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updateData.password = hash;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
JS

# ======================================
# routes/petrolPump.js
# ======================================
cat > routes/petrolPump.js <<'JS'
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPump,
  getPumps,
  getPumpWithLabor,
  addLabor,
  getLabors,
  updatePump,
  deletePump,
  updateLabor,
  deleteLabor,
} = require("../controllers/petrolPumpController");

router.post("/", auth, createPump);
router.get("/", auth, getPumps);
router.get("/:id", auth, getPumpWithLabor);
router.post("/:id/labors", auth, addLabor);
router.get("/:id/labors", auth, getLabors);

// NEW EDIT/DELETE APIs
router.put("/:id", auth, updatePump);
router.delete("/:id", auth, deletePump);
router.put("/:id/labors/:laborId", auth, updateLabor);
router.delete("/:id/labors/:laborId", auth, deleteLabor);

module.exports = router;
JS

# ======================================
# routes/profile.js
# ======================================
cat > routes/profile.js <<'JS'
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getProfile, updateProfile } = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);

module.exports = router;
JS

echo "Edit/Delete APIs added successfully!"
