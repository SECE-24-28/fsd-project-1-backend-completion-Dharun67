const mongoose = require("mongoose");

const LeaveApplicationSchema = new mongoose.Schema({
    roll: { type: String, required: true },
    name: String,
    type: String,
    from: String,
    to: String,
    reason: String,
    status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
    appliedOn: { type: String, default: () => new Date().toISOString().split("T")[0] },
}, { timestamps: true });

module.exports = mongoose.model("LeaveApplication", LeaveApplicationSchema);
