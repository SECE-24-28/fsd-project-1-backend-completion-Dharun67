const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    icon: { type: String, default: "" },
    name: { type: String, required: true },
    hod: { type: String, required: true },
    facultyCount: { type: String, default: "0 Faculty" },
    studentCount: { type: String, default: "0 Students" },
    ugCourses: { type: String, default: "0 UG" },
    pgCourses: { type: String, default: "0 PG" },
    labCount: { type: String, default: "0 Labs" },
    accreditation: { type: String, default: "" },
    color: { type: String, default: "#3b82f6" }
}, { timestamps: true });

module.exports = mongoose.model("Department", DepartmentSchema);
