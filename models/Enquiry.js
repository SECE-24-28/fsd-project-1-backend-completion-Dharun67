const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
    // Application ID (auto-generated)
    appId: { type: String, unique: true, sparse: true },

    // Basic contact (for both admission apps and contact enquiries)
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,  // for contact-form enquiries
    message: String,  // for contact-form enquiries

    // Full Admission Application fields (for admissions page submissions)
    firstName: String,
    lastName: String,
    gender: String,
    dob: String,
    religion: String,
    community: String,
    nationality: String,
    bloodGroup: String,
    aadharNumber: String,
    address: String,
    city: String,
    state: String,
    pincode: String,

    // Parent info
    parentName: String,
    parentOccupation: String,
    parentIncome: String,
    parentMobile: String,
    parentEmail: String,

    // 10th details
    schoolName: String,
    tenthBoard: String,
    tenthPercent: String,
    tenthYearPassing: String,

    // 12th details
    collegeName: String,
    twelfthBoard: String,
    twelfthPercent: String,
    twelfthPhysics: String,
    twelfthChemistry: String,
    twelfthMaths: String,
    yearPassing: String,
    tneaNo: String,

    // Course selection
    department: String,
    admissionType: String,
    hostelRequired: { type: String, default: "no" },
    transportRequired: { type: String, default: "no" },

    // Admin tracking
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Under Review", "Document Verification", "Approved", "Rejected"]
    },
    replied: { type: Boolean, default: false },
    reviewNotes: { type: String, default: "" },
    reviewedBy: { type: String, default: "" },
    reviewedAt: Date,

    // Type flag: 'admission' or 'contact'
    type: { type: String, default: "admission", enum: ["admission", "contact"] },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", EnquirySchema);
