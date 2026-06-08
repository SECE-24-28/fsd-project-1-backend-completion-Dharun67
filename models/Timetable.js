const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
    dept: { type: String, required: true },
    sem: { type: Number, required: true },
    slots: [{
        day: String,
        slots: [String],
    }]
}, { timestamps: true });

module.exports = mongoose.model("Timetable", TimetableSchema);
