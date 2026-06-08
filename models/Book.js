const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    dept: { type: String, required: true },
    copies: { type: Number, default: 1 },
    available: { type: Number, default: 1 },
    status: { type: String, default: "Available" }
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
