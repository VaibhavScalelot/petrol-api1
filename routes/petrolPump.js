const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPump,
  getPumps,
  getPumpWithLabor,
  addLabor,
  getLabors,
} = require("../controllers/petrolPumpController");

router.post("/", auth, createPump);
router.get("/", auth, getPumps);
router.get("/:id", auth, getPumpWithLabor);
router.post("/:id/labors", auth, addLabor);
router.get("/:id/labors", auth, getLabors);

module.exports = router;
