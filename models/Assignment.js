const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: String,
    desc: String,
    due: String,
    maxMarks: { type: Number, default: 10 },
    status: { type: String, default: "Active" },
    submissions: { type: Number, default: 0 },
    faculty: String,
}, { timestamps: true });

module.exports = mongoose.model("Assignment", AssignmentSchema);
