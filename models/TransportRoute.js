const mongoose = require("mongoose");

const TransportRouteSchema = new mongoose.Schema({
    busNo: { type: String, required: true, unique: true },
    route: { type: String, required: true },
    area: { type: String, required: true },
    stops: { type: Number, default: 0 },
    driver: { type: String, default: "" },
    contact: { type: String, default: "" },
    capacity: { type: Number, default: 40 },
    students: { type: Number, default: 0 },
    status: { type: String, default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("TransportRoute", TransportRouteSchema);
