const mongoose = require("mongoose");

const CertificateRequestSchema = new mongoose.Schema({
    certId: { type: String, required: true, unique: true },
    student: { type: String, required: true },
    roll: { type: String, required: true },
    dept: { type: String, required: true },
    type: { type: String, required: true },
    purpose: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] }
}, { timestamps: true });

module.exports = mongoose.model("CertificateRequest", CertificateRequestSchema);
