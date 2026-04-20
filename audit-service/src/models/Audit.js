const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: String,
  userId: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audit", auditSchema); //Audit is modelName