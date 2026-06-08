const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: { type: String, required: true },
    sem: { type: Number, required: true },
    credits: { type: Number, required: true },
    ltp: { type: String, default: "3-0-0" },
    faculty: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Subject", SubjectSchema);
