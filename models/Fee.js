const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    total: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    due: { type: Number, default: 0 },
    history: [{
        receipt: String,
        description: String,
        amount: Number,
        date: String,
        status: { type: String, default: "Paid" }, // Paid, Pending
    }]
}, { timestamps: true });

module.exports = mongoose.model("Fee", FeeSchema);
