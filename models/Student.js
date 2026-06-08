const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    roll: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: String,
    sem: Number,
    email: { type: String, required: true, unique: true },
    phone: String,
    dob: String,
    password: { type: String, required: true },
    status: { type: String, default: "Active" },
    parentName: String,
    parentPhone: String,
    address: String,
    bloodGroup: String,
    gender: String,
    religion: String,
    community: String,
    nationality: { type: String, default: "Indian" },
    aadharNumber: String,
    profilePhoto: { type: String, default: "" }, // Base64 data URL
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
