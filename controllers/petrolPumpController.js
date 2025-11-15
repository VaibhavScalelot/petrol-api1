const PetrolPump = require("../models/PetrolPump");
const Labor = require("../models/Labor");

exports.createPump = async (req, res) => {
  try {
    const pump = await PetrolPump.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.json(pump);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPumps = async (req, res) => {
  try {
    const pumps = await PetrolPump.find().sort({ createdAt: -1 });
    res.json(pumps);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPumpWithLabor = async (req, res) => {
  try {
    const pump = await PetrolPump.findById(req.params.id);
    const labors = await Labor.find({ petrolPump: req.params.id });
    res.json({ pump, labors });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addLabor = async (req, res) => {
  try {
    const labor = await Labor.create({
      ...req.body,
      petrolPump: req.params.id,
      createdBy: req.user.id,
    });
    res.json(labor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLabors = async (req, res) => {
  try {
    const labors = await Labor.find({ petrolPump: req.params.id });
    res.json(labors);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

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
