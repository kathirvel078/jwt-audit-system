const express = require("express");
const router = express.Router();
const Audit = require("../models/Audit");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// CREATE LOG (called by user service)
router.post("/audit", async (req, res) => {
  const log = await Audit.create(req.body);
  res.json(log);
});

// GET LOGS (ADMIN ONLY)
router.get("/logs", auth, authorize("ADMIN"), async (req, res) => {
  const logs = await Audit.find().sort({ timestamp: -1 });  //-1 descending newest first
  res.json(logs);
});

module.exports = router;