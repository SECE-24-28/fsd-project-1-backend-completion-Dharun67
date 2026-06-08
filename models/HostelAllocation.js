const mongoose = require("mongoose");

const HostelAllocationSchema = new mongoose.Schema({
    room: { type: String, required: true },
    student: { type: String, required: true },
    roll: { type: String, required: true },
    block: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] }
}, { timestamps: true });

module.exports = mongoose.model("HostelAllocation", HostelAllocationSchema);
