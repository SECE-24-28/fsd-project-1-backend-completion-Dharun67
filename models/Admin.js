const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: String,
    role: { type: String, default: "Admin" },
    status: { type: String, default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);
