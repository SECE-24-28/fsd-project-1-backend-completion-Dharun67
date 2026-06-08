const mongoose = require("mongoose");

const SubjectResultSchema = new mongoose.Schema({
    name: String,
    credits: Number,
    grade: String,
    points: Number,
});

const SemesterResultSchema = new mongoose.Schema({
    gpa: Number,
    result: { type: String, default: "Pass" },
    arrears: { type: Number, default: 0 },
    subjects: [SubjectResultSchema]
});

const ResultSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    sem3: SemesterResultSchema,
    sem4: SemesterResultSchema,
}, { timestamps: true });

module.exports = mongoose.model("Result", ResultSchema);
