const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    category: String,
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    pinned: { type: Boolean, default: false },
    status: { type: String, default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Notice", NoticeSchema);
