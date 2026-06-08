const mongoose = require("mongoose");

const ExamScheduleSchema = new mongoose.Schema({
    dept: { type: String, required: true },
    sem: { type: Number, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    examDate: { type: String, required: true }, // e.g., "2026-07-15"
    session: { type: String, required: true },  // e.g., "FN" (9:30 AM - 12:30 PM) or "AN" (1:30 PM - 4:30 PM)
    hallNo: { type: String, required: true }    // e.g., "LH-102"
}, { timestamps: true });

module.exports = mongoose.model("ExamSchedule", ExamScheduleSchema);
