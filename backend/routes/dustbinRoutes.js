const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createDustbin,
  getDustbins,
  updateDustbin,
  deleteDustbin,
  getPriorityBins
} = require("../controllers/dustbinController");

/* Create Dustbin */

router.post("/", createDustbin);

/* Get All Dustbins */

router.get("/", getDustbins);

/* Get Priority Collection Order */

router.get("/priority", getPriorityBins);

/* Update Dustbin */

router.put("/:id", updateDustbin);

/* Delete Dustbin */

router.delete("/:id", deleteDustbin);

router.post("/", protect, createDustbin);

router.get("/", protect, getDustbins);

router.get("/priority", protect, getPriorityBins);

router.put("/:id", protect, updateDustbin);

router.delete("/:id", protect, deleteDustbin);

module.exports = router;