const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: { type: String, required: true },
    sem: { type: Number, required: true },
    credits: { type: Number, required: true },
    type: { type: String, default: "Core" },
    faculty: { type: String, default: "" },
    studentsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
