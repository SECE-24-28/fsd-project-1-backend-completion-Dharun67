const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        console.log("🔌 Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URL, { dbName: "bec_portal_db" });
        console.log("✅ Connected.");

        const username = "dharunkumar.n2024cse@sece.ac.in";
        const password = "dharun@456";
        const email = "dharunkumar.n2024cse@sece.ac.in";
        const name = "Dharun Kumar";

        let admin = await Admin.findOne({ username });
        if (admin) {
            console.log("Admin user already exists, updating password...");
            admin.password = password;
            admin.email = email;
            admin.name = name;
            await admin.save();
            console.log("✅ Admin user updated successfully!");
        } else {
            admin = new Admin({
                username,
                password,
                email,
                name,
                role: "Super Admin",
                status: "Active"
            });
            await admin.save();
            console.log("✅ Admin user created successfully!");
        }
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

createAdmin();
