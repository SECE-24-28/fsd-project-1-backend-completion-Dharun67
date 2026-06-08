const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    overall: { type: Number, default: 100 },
    subjects: [{
        name: String,
        total: { type: Number, default: 0 },
        present: { type: Number, default: 0 },
        absent: { type: Number, default: 0 },
    }]
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
