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
