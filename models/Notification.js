const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    rollNo: { type: String, required: true },
    icon: { type: String, default: "📢" },
    title: { type: String, required: true },
    message: String,
    time: { type: String, default: () => new Date().toLocaleString() },
    isNew: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
