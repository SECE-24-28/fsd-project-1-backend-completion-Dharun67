const mongoose = require("mongoose");

const StudentAssignmentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    title: String,
    subject: String,
    faculty: String,
    due: String,
    status: { type: String, default: "pending" }, // pending, submitted
    submittedFile: {
        name: String,
        data: String, // Base64 encoding
        size: Number,
        mimeType: String,
        submittedAt: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("StudentAssignment", StudentAssignmentSchema);
