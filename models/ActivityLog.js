const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
    user: String,
    action: String,
    details: String,
    timestamp: { type: String, default: () => new Date().toLocaleString() },
    ip: String,
}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
