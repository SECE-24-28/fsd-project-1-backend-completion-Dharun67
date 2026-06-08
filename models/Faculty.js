const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    empId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: String,
    designation: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    status: { type: String, default: "Active" },
    qualification: String,
    experience: String,
    specialization: String,
    joiningDate: String,
    gender: String,
    dob: String,
    address: String,
    subjects: [String], // subjects they teach
    profilePhoto: { type: String, default: "" }, // Base64 data URL
}, { timestamps: true });

module.exports = mongoose.model("Faculty", FacultySchema);
