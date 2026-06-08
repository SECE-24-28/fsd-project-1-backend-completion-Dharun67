const mongoose = require("mongoose");

const WebsiteSettingSchema = new mongoose.Schema({
    key: { type: String, default: "site_settings", unique: true },
    collegeName: { type: String, default: "Best Engineering College" },
    logo: String,
    favicon: String,
    email: String,
    phone: String,
    address: String,
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        youtube: String,
    },
    footer: {
        copyright: String,
        about: String,
        quickLinks: [String],
    },
    homepage: mongoose.Schema.Types.Mixed, // Storing dynamic homepage contents
    placements: mongoose.Schema.Types.Mixed, // Storing placements metrics/drives
}, { timestamps: true });

module.exports = mongoose.model("WebsiteSetting", WebsiteSettingSchema);
