const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: String,
    venue: String,
    status: { type: String, default: "Upcoming" },
    image: String,
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
