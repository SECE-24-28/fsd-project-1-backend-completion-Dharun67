const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    subjects: [{
        name: String,
        ia1: { type: Number, default: 0 },
        ia2: { type: Number, default: 0 },
        assignment: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    }]
}, { timestamps: true });

module.exports = mongoose.model("Mark", MarkSchema);
