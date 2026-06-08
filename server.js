const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS must come before session middleware, with credentials: true
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://bect.vercel.app",
    "https://*.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list or matches vercel pattern
        if (allowedOrigins.includes(origin) || origin.includes('vercel.app') || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,  // Required so the session cookie is sent back to the React app
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 5000;

// ==========================================
// SESSION MIDDLEWARE — stored in MongoDB
// ==========================================
// Sessions are persisted in the "sessions" collection inside bec_portal_db.
// No JWT, no localStorage — just a server-side session identified by a cookie.
app.use(session({
    secret: process.env.SESSION_SECRET || "bec_session_secret_key_2026",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: "bec_portal_db",
        collectionName: "sessions",
        ttl: 24 * 60 * 60  // Sessions expire after 24 hours (in seconds)
    }),
    cookie: {
        httpOnly: true,          // Cookie is NOT accessible via JavaScript (secure)
        secure: isProduction,    // Set to true in production with HTTPS (required for sameSite: "none")
        maxAge: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
        sameSite: isProduction ? "none" : "lax"  // sameSite: "none" required for cross-domain cookies in production
    }
}));

const userroutes = require("./routers/UserRouter");
app.use("/api/user", userroutes);

const portalroutes = require("./routers/PortalRouter");
app.use("/api/portal", portalroutes);

// Root endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BEC Portal Backend API",
        version: "1.0.0",
        status: "running",
        endpoints: {
            health: "/health",
            user: "/api/user/*",
            portal: "/api/portal/*"
        },
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        session: req.session?.user ? `logged in as ${req.session.user.type}` : "not logged in"
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { dbName: "bec_portal_db" })
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas - bec_portal_db");
        console.log("✅ Sessions will be stored in MongoDB (bec_portal_db → sessions)");
        app.listen(PORT, () => {
            console.log(`✅ BEC Portal API Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection FAILED:", err.message);
        process.exit(1);
    });