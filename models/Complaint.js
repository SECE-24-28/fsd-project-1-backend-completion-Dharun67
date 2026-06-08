const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    student: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, default: "Medium" },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    status: { type: String, default: "Open", enum: ["Open", "In Progress", "Resolved"] }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", ComplaintSchema);
