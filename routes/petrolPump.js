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

// Pump routes
router.post("/", auth, createPump);
router.get("/", auth, getPumps);
router.get("/:id", auth, getPumpWithLabor);
router.put("/:id", auth, updatePump);       // Edit pump
router.delete("/:id", auth, deletePump);    // Delete pump

// Labor routes
router.post("/:id/labors", auth, addLabor);
router.get("/:id/labors", auth, getLabors);
router.put("/:id/labors/:laborId", auth, updateLabor);      // Edit labor
router.delete("/:id/labors/:laborId", auth, deleteLabor);   // Delete labor

module.exports = router;
