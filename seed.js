const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
const Admin = require("./models/Admin");
const Notice = require("./models/Notice");
const Event = require("./models/Event");
const Assignment = require("./models/Assignment");
const StudentAssignment = require("./models/StudentAssignment");
const LeaveApplication = require("./models/LeaveApplication");
const Attendance = require("./models/Attendance");
const Mark = require("./models/Mark");
const Fee = require("./models/Fee");
const Timetable = require("./models/Timetable");
const Enquiry = require("./models/Enquiry");
const Notification = require("./models/Notification");
const Result = require("./models/Result");
const WebsiteSetting = require("./models/WebsiteSetting");
const ActivityLog = require("./models/ActivityLog");
const ExamSchedule = require("./models/ExamSchedule");
const Department = require("./models/Department");
const Course = require("./models/Course");
const Subject = require("./models/Subject");
const Book = require("./models/Book");
const HostelAllocation = require("./models/HostelAllocation");
const TransportRoute = require("./models/TransportRoute");
const CertificateRequest = require("./models/CertificateRequest");
const Complaint = require("./models/Complaint");

const seedData = async () => {
    try {
        console.log("🔌 Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URL, { dbName: "bec_portal_db" });
        console.log("✅ Connected. Clearing existing collections...");

        await Promise.all([
            Student.deleteMany({}), Faculty.deleteMany({}), Admin.deleteMany({}),
            Notice.deleteMany({}), Event.deleteMany({}), Assignment.deleteMany({}),
            StudentAssignment.deleteMany({}), LeaveApplication.deleteMany({}),
            Attendance.deleteMany({}), Mark.deleteMany({}), Fee.deleteMany({}),
            Timetable.deleteMany({}), Enquiry.deleteMany({}), Notification.deleteMany({}),
            Result.deleteMany({}), WebsiteSetting.deleteMany({}),
            ActivityLog.deleteMany({}), ExamSchedule.deleteMany({}),
            Department.deleteMany({}), Course.deleteMany({}), Subject.deleteMany({}),
            Book.deleteMany({}), HostelAllocation.deleteMany({}), TransportRoute.deleteMany({}),
            CertificateRequest.deleteMany({}), Complaint.deleteMany({}),
        ]);
        console.log("🗑️  All collections cleared. Seeding rich data...");

        // ============================================================
        // 1. WEBSITE SETTINGS
        // ============================================================
        await new WebsiteSetting({
            key: "site_settings",
            collegeName: "Best Engineering College",
            logo: "/images/logo.png",
            email: "info@bec.edu.in",
            phone: "+91 44 2716 3000",
            address: "NH-48, Pennalur Village, Kanchipuram - 602 117, Tamil Nadu, India",
            socialMedia: {
                facebook: "https://facebook.com/bec",
                twitter: "https://twitter.com/bec",
                linkedin: "https://linkedin.com/company/bec",
                instagram: "https://instagram.com/bec",
                youtube: "https://youtube.com/bec"
            },
            footer: {
                copyright: "© 2026 Best Engineering College. All Rights Reserved.",
                about: "Leading engineering institution providing quality education since 1995.",
                quickLinks: ["About Us", "Admissions", "Departments", "Placements", "Contact"]
            },
            homepage: {
                heroBanner: {
                    title: "Welcome to Best Engineering College",
                    subtitle: "Empowering Future Engineers Since 1995",
                    image: "/images/hero-banner.jpg",
                    buttonText: "Apply Now",
                    buttonLink: "/admissions"
                },
                welcomeMessage: {
                    heading: "Message from Principal",
                    content: "Welcome to Best Engineering College. We are committed to providing quality education and shaping future leaders in engineering and technology.",
                    image: "/images/principal.jpg",
                    name: "Dr. Rajesh Kumar",
                    designation: "Principal"
                },
                highlights: [
                    { icon: "🎓", title: "Quality Education", description: "Top-notch academic programs" },
                    { icon: "👨‍🏫", title: "Expert Faculty", description: "Highly qualified professors" },
                    { icon: "🏆", title: "100% Placements", description: "Excellent placement records" },
                    { icon: "🔬", title: "Modern Labs", description: "State-of-the-art facilities" }
                ],
                statistics: [
                    { value: "5000+", label: "Students" },
                    { value: "200+", label: "Faculty" },
                    { value: "6", label: "Departments" },
                    { value: "95%", label: "Placement Rate" }
                ],
                featuredCourses: [
                    { code: "CSE", name: "Computer Science", duration: "4 Years", seats: 120 },
                    { code: "ECE", name: "Electronics & Communication", duration: "4 Years", seats: 90 },
                    { code: "MECH", name: "Mechanical Engineering", duration: "4 Years", seats: 90 }
                ],
                downloads: [
                    { id: 1, title: "Admission Form 2026", file: "/downloads/admission-form.pdf", category: "Forms", size: "250 KB", date: "2026-05-01" },
                    { id: 2, title: "Academic Regulations", file: "/downloads/regulations.pdf", category: "Regulations", size: "1.2 MB", date: "2026-04-15" },
                    { id: 3, title: "Fee Structure 2026", file: "/downloads/fee-structure.pdf", category: "Circulars", size: "180 KB", date: "2026-05-10" }
                ]
            },
            placements: {
                companies: [
                    { id: 1, name: "TCS", logo: "/images/companies/tcs.png", visitDate: "2026-05-20", offers: 52, package: "4.0 LPA" },
                    { id: 2, name: "Infosys", logo: "/images/companies/infosys.png", visitDate: "2026-05-22", offers: 41, package: "4.5 LPA" },
                    { id: 3, name: "Wipro", logo: "/images/companies/wipro.png", visitDate: "2026-05-25", offers: 38, package: "4.2 LPA" },
                    { id: 4, name: "Amazon", logo: "/images/companies/amazon.png", visitDate: "2026-06-01", offers: 12, package: "12.0 LPA" },
                    { id: 5, name: "Zoho", logo: "/images/companies/zoho.png", visitDate: "2026-06-05", offers: 22, package: "8.5 LPA" }
                ],
                statistics: {
                    totalPlaced: 248,
                    totalCompanies: 52,
                    highestPackage: "18 LPA",
                    averagePackage: "5.2 LPA",
                    placementRate: "97%"
                },
                drives: [
                    { id: "ZOHO", company: "Zoho Corporation", role: "Software Developer", package: "8.5 LPA", date: "2026-06-10" },
                    { id: "TCS", company: "TCS", role: "Systems Engineer", package: "6.5 LPA", date: "2026-06-20" },
                    { id: "INFY", company: "Infosys", role: "Power Programmer", package: "5.0 LPA", date: "2026-06-25" },
                    { id: "AMZN", company: "Amazon", role: "SDE-1", package: "18.0 LPA", date: "2026-07-05" }
                ]
            }
        }).save();
        console.log("✅ Website settings seeded");

        // ============================================================
        // 2. NOTICES
        // ============================================================
        await Notice.insertMany([
            { title: "Semester Examination Schedule — July 2026", content: "End semester exams will begin from July 15, 2026. Hall tickets available from July 1.", date: "2026-06-01", category: "Exam", pinned: true, status: "Active" },
            { title: "Holiday Notification — June 17", content: "College will remain closed on June 17, 2026 for a public holiday.", date: "2026-06-04", category: "Holiday", pinned: false, status: "Active" },
            { title: "Workshop on AI & Generative Models", content: "Two-day national workshop on Generative AI — June 25-26 at Seminar Hall.", date: "2026-06-05", category: "Event", pinned: true, status: "Active" },
            { title: "Fee Payment Deadline — Semester 5", content: "Last date for Semester 5 fee payment is June 30, 2026. Late fee of ₹500/day applies after deadline.", date: "2026-06-03", category: "Finance", pinned: false, status: "Active" },
            { title: "Placement Drive — Amazon & Zoho", content: "Amazon and Zoho are visiting on July 5 & June 10 respectively. Register via the placement portal.", date: "2026-06-02", category: "Placement", pinned: true, status: "Active" },
        ]);
        console.log("✅ Notices seeded");

        // ============================================================
        // 3. EVENTS
        // ============================================================
        await Event.insertMany([
            { title: "Annual Tech Fest 2026 — INNOVATE", description: "Four-day national level technical festival featuring hackathons, paper presentations, and robotics.", date: "2026-07-15", venue: "Main Auditorium & Campus", image: "/images/event1.jpg", status: "Upcoming" },
            { title: "Sports Day 2026", description: "Inter-department sports competition across 15 disciplines.", date: "2026-06-20", venue: "Sports Ground", image: "/images/event2.jpg", status: "Upcoming" },
            { title: "Alumni Meet 2026", description: "Annual alumni gathering — keynote talks and networking.", date: "2026-06-28", venue: "Main Auditorium", image: "/images/event3.jpg", status: "Upcoming" },
            { title: "Graduation Ceremony 2026", description: "Convocation for 2022 batch graduates.", date: "2026-07-10", venue: "Open Air Theatre", image: "/images/event4.jpg", status: "Upcoming" },
        ]);
        console.log("✅ Events seeded");

        // ============================================================
        // 4. FACULTY — 8 unique faculty members
        // ============================================================
        const facultyList = [
            {
                empId: "faculty", name: "Dr. Ramesh Kumar (Demo)", dept: "CSE",
                designation: "Assoc. Professor", email: "faculty@bec.edu.in",
                phone: "+91 98765 50001", password: "faculty123", status: "Active",
                qualification: "Ph.D (IIT Madras)", experience: "12 years",
                specialization: "Machine Learning & Deep Learning",
                subjects: ["Data Structures", "Algorithms", "Machine Learning"],
                joiningDate: "June 1, 2013", gender: "Male", dob: "1981-04-10",
                address: "14, Anna Nagar, Chennai - 600 040"
            },
            {
                empId: "FAC-CSE-001", name: "Dr. Ramesh Kumar", dept: "CSE",
                designation: "Assoc. Professor", email: "ramesh@bec.edu.in",
                phone: "+91 98765 50001", password: "faculty123", status: "Active",
                qualification: "Ph.D (IIT Madras)", experience: "12 years",
                specialization: "Machine Learning & Deep Learning",
                subjects: ["Data Structures", "Algorithms", "Machine Learning"],
                joiningDate: "June 1, 2013", gender: "Male", dob: "1981-04-10",
                address: "14, Anna Nagar, Chennai - 600 040"
            },
            {
                empId: "FAC-CSE-002", name: "Dr. Priya Nair", dept: "CSE",
                designation: "Asst. Professor", email: "priya.f@bec.edu.in",
                phone: "+91 98765 50002", password: "faculty123", status: "Active",
                qualification: "Ph.D (Anna University)", experience: "8 years",
                specialization: "Data Science & Big Data Analytics",
                subjects: ["DBMS", "Big Data", "Python Programming"],
                joiningDate: "December 10, 2017", gender: "Female", dob: "1986-08-22",
                address: "32, T Nagar, Chennai - 600 017"
            },
            {
                empId: "FAC-ECE-001", name: "Dr. Anand Rajan", dept: "ECE",
                designation: "Professor", email: "anand@bec.edu.in",
                phone: "+91 98765 50003", password: "faculty123", status: "Active",
                qualification: "Ph.D (IIT Bombay)", experience: "15 years",
                specialization: "VLSI Design & Embedded Systems",
                subjects: ["VLSI Design", "Embedded Systems", "Digital Electronics"],
                joiningDate: "May 15, 2010", gender: "Male", dob: "1978-11-05",
                address: "76, Velachery, Chennai - 600 042"
            },
            {
                empId: "FAC-ME-001", name: "Prof. Kumar Selvam", dept: "Mech",
                designation: "Assoc. Professor", email: "kumar@bec.edu.in",
                phone: "+91 98765 50004", password: "faculty123", status: "Active",
                qualification: "M.Tech (NIT Trichy)", experience: "10 years",
                specialization: "Thermal Engineering & CFD",
                subjects: ["Thermodynamics", "Fluid Mechanics", "CAD/CAM"],
                joiningDate: "July 20, 2015", gender: "Male", dob: "1983-03-18",
                address: "55, Adyar, Chennai - 600 020"
            },
            {
                empId: "FAC-CV-001", name: "Dr. Meena Thangaraj", dept: "Civil",
                designation: "Asst. Professor", email: "meena@bec.edu.in",
                phone: "+91 98765 50005", password: "faculty123", status: "On Leave",
                qualification: "Ph.D (Anna University)", experience: "6 years",
                specialization: "Structural Engineering & Earthquake Analysis",
                subjects: ["Structural Analysis", "RCC Design", "Surveying"],
                joiningDate: "August 1, 2019", gender: "Female", dob: "1990-07-14",
                address: "11, Tambaram, Chennai - 600 045"
            },
            {
                empId: "FAC-IT-001", name: "Dr. Deepa Srinivasan", dept: "IT",
                designation: "Asst. Professor", email: "deepa@bec.edu.in",
                phone: "+91 98765 50006", password: "faculty123", status: "Active",
                qualification: "Ph.D (VIT Vellore)", experience: "7 years",
                specialization: "Web Technologies & Cloud Computing",
                subjects: ["Web Technologies", "Cloud Computing", "Node.js"],
                joiningDate: "January 5, 2018", gender: "Female", dob: "1988-12-01",
                address: "28, Guindy, Chennai - 600 032"
            },
            {
                empId: "FAC-CSE-003", name: "Dr. Karthikeyan V", dept: "CSE",
                designation: "Professor & HOD", email: "karthik.hod@bec.edu.in",
                phone: "+91 98765 50007", password: "faculty123", status: "Active",
                qualification: "Ph.D (IIT Delhi)", experience: "20 years",
                specialization: "Computer Networks & Cybersecurity",
                subjects: ["Computer Networks", "Network Security", "Operating Systems"],
                joiningDate: "July 1, 2005", gender: "Male", dob: "1975-06-22",
                address: "4, Nungambakkam, Chennai - 600 034"
            },
        ];
        await Faculty.insertMany(facultyList);
        console.log("✅ Faculty seeded (8 unique faculty)");

        // ============================================================
        // 5. ADMIN
        // ============================================================
        await Admin.insertMany([
            { username: "admin", password: "admin123", email: "admin@bec.edu.in", name: "System Administrator", role: "Super Admin", status: "Active" },
            { username: "staff1", password: "staff123", email: "staff1@bec.edu.in", name: "Admission Staff Member", role: "Admission Officer", status: "Active" },
        ]);
        console.log("✅ Admins seeded");

        // ============================================================
        // 6. STUDENTS — 15 fully unique students
        // ============================================================
        const studentsList = [
            // DEMO login account
            {
                roll: "student", name: "Demo Student", dept: "CSE", sem: 5,
                email: "student@bec.edu.in", phone: "+91 98765 43200",
                dob: "2003-03-15", password: "student123", status: "Active",
                parentName: "Demo Parent", parentPhone: "+91 98765 00000",
                address: "1, Demo Nagar, Chennai", bloodGroup: "O+",
                gender: "Male", community: "OC", nationality: "Indian"
            },
            // CSE Students
            {
                roll: "21CS001", name: "Arjun Ramesh", dept: "CSE", sem: 5,
                email: "arjun@bec.edu.in", phone: "+91 98765 43210",
                dob: "2003-03-15", password: "student123", status: "Active",
                parentName: "Ramesh Kumar", parentPhone: "+91 98765 00001",
                address: "12, Anna Nagar, Chennai - 600 040", bloodGroup: "O+",
                gender: "Male", community: "OC", nationality: "Indian"
            },
            {
                roll: "21CS002", name: "Priya Lakshmi", dept: "CSE", sem: 5,
                email: "priya@bec.edu.in", phone: "+91 98765 43211",
                dob: "2003-05-20", password: "student123", status: "Active",
                parentName: "Lakshmi Devi", parentPhone: "+91 98765 00002",
                address: "45, T Nagar, Chennai - 600 017", bloodGroup: "A+",
                gender: "Female", community: "BC", nationality: "Indian"
            },
            {
                roll: "21CS003", name: "Vikram Suresh", dept: "CSE", sem: 5,
                email: "vikram@bec.edu.in", phone: "+91 98765 43219",
                dob: "2003-08-10", password: "student123", status: "Active",
                parentName: "Suresh Babu", parentPhone: "+91 98765 00009",
                address: "67, Porur, Chennai - 600 116", bloodGroup: "B+",
                gender: "Male", community: "MBC", nationality: "Indian"
            },
            {
                roll: "21CS004", name: "Ananya Krishnan", dept: "CSE", sem: 5,
                email: "ananya@bec.edu.in", phone: "+91 98765 43220",
                dob: "2003-01-25", password: "student123", status: "Active",
                parentName: "Krishnan S", parentPhone: "+91 98765 00010",
                address: "22, Pallavaram, Chennai - 600 043", bloodGroup: "AB+",
                gender: "Female", community: "OC", nationality: "Indian"
            },
            {
                roll: "21CS005", name: "Surya Prakash", dept: "CSE", sem: 5,
                email: "surya@bec.edu.in", phone: "+91 98765 43221",
                dob: "2003-11-14", password: "student123", status: "Active",
                parentName: "Prakash T", parentPhone: "+91 98765 00011",
                address: "89, Chromepet, Chennai - 600 044", bloodGroup: "O-",
                gender: "Male", community: "SC", nationality: "Indian"
            },
            // ECE Students
            {
                roll: "21EC001", name: "Rahul Sharma", dept: "ECE", sem: 5,
                email: "rahul@bec.edu.in", phone: "+91 98765 43212",
                dob: "2003-07-10", password: "student123", status: "Active",
                parentName: "Sharma Ji", parentPhone: "+91 98765 00003",
                address: "23, Velachery, Chennai - 600 042", bloodGroup: "B+",
                gender: "Male", community: "OC", nationality: "Indian"
            },
            {
                roll: "21EC002", name: "Kavitha Mohan", dept: "ECE", sem: 5,
                email: "kavitha@bec.edu.in", phone: "+91 98765 43222",
                dob: "2003-04-08", password: "student123", status: "Active",
                parentName: "Mohan R", parentPhone: "+91 98765 00012",
                address: "56, Sholinganallur, Chennai - 600 119", bloodGroup: "A-",
                gender: "Female", community: "BC", nationality: "Indian"
            },
            {
                roll: "21EC003", name: "Arun Vijay", dept: "ECE", sem: 5,
                email: "arunv@bec.edu.in", phone: "+91 98765 43223",
                dob: "2003-09-19", password: "student123", status: "Active",
                parentName: "Vijay Kumar", parentPhone: "+91 98765 00013",
                address: "10, Madipakkam, Chennai - 600 091", bloodGroup: "B-",
                gender: "Male", community: "OC", nationality: "Indian"
            },
            // Mech Students
            {
                roll: "21ME001", name: "Sneha Patel", dept: "Mech", sem: 5,
                email: "sneha@bec.edu.in", phone: "+91 98765 43213",
                dob: "2003-02-14", password: "student123", status: "Active",
                parentName: "Patel Sir", parentPhone: "+91 98765 00004",
                address: "67, Adyar, Chennai - 600 020", bloodGroup: "AB+",
                gender: "Female", community: "OC", nationality: "Indian"
            },
            {
                roll: "21ME002", name: "Gowtham Raj", dept: "Mech", sem: 5,
                email: "gowtham@bec.edu.in", phone: "+91 98765 43224",
                dob: "2003-06-30", password: "student123", status: "Active",
                parentName: "Raj P", parentPhone: "+91 98765 00014",
                address: "33, Thiruvottiyur, Chennai - 600 019", bloodGroup: "O+",
                gender: "Male", community: "MBC", nationality: "Indian"
            },
            // Civil Student
            {
                roll: "21CV001", name: "Karthik Raj", dept: "Civil", sem: 3,
                email: "karthik@bec.edu.in", phone: "+91 98765 43214",
                dob: "2003-09-25", password: "student123", status: "On Leave",
                parentName: "Raj Kumar", parentPhone: "+91 98765 00005",
                address: "89, Tambaram, Chennai - 600 045", bloodGroup: "O-",
                gender: "Male", community: "BC", nationality: "Indian"
            },
            // IT Students
            {
                roll: "21IT001", name: "Divya Menon", dept: "IT", sem: 3,
                email: "divya@bec.edu.in", phone: "+91 98765 43215",
                dob: "2003-11-30", password: "student123", status: "Active",
                parentName: "Menon Sir", parentPhone: "+91 98765 00006",
                address: "34, Chrompet, Chennai - 600 044", bloodGroup: "A-",
                gender: "Female", community: "OC", nationality: "Indian"
            },
            {
                roll: "21IT002", name: "Sathish Kumar", dept: "IT", sem: 3,
                email: "sathish@bec.edu.in", phone: "+91 98765 43225",
                dob: "2003-12-05", password: "student123", status: "Active",
                parentName: "Kumar S", parentPhone: "+91 98765 00015",
                address: "18, Avadi, Chennai - 600 054", bloodGroup: "B+",
                gender: "Male", community: "SC", nationality: "Indian"
            },
            {
                roll: "21IT003", name: "Pavithra Devi", dept: "IT", sem: 3,
                email: "pavithra@bec.edu.in", phone: "+91 98765 43226",
                dob: "2004-02-17", password: "student123", status: "Active",
                parentName: "Devi A", parentPhone: "+91 98765 00016",
                address: "99, Ambattur, Chennai - 600 053", bloodGroup: "A+",
                gender: "Female", community: "MBC", nationality: "Indian"
            },
        ];
        await Student.insertMany(studentsList);
        console.log(`✅ ${studentsList.length} unique students seeded`);

        // ============================================================
        // 7. UNIQUE ATTENDANCE — Different for every student
        // ============================================================
        const attendanceData = [
            // Demo student
            { rollNo: "student", overall: 80, subjects: [{ name: "Data Structures", total: 24, present: 20, absent: 4 }, { name: "Operating Systems", total: 22, present: 17, absent: 5 }, { name: "DBMS", total: 20, present: 16, absent: 4 }, { name: "Computer Networks", total: 24, present: 18, absent: 6 }, { name: "Software Engineering", total: 20, present: 16, absent: 4 }] },
            // 21CS001 — Good attendance 
            { rollNo: "21CS001", overall: 87, subjects: [{ name: "Data Structures", total: 24, present: 21, absent: 3 }, { name: "Operating Systems", total: 22, present: 19, absent: 3 }, { name: "DBMS", total: 20, present: 17, absent: 3 }, { name: "Computer Networks", total: 24, present: 21, absent: 3 }, { name: "Software Engineering", total: 20, present: 17, absent: 3 }, { name: "DBMS Lab", total: 10, present: 10, absent: 0 }] },
            // 21CS002 — Excellent attendance
            { rollNo: "21CS002", overall: 95, subjects: [{ name: "Data Structures", total: 24, present: 23, absent: 1 }, { name: "Operating Systems", total: 22, present: 21, absent: 1 }, { name: "DBMS", total: 20, present: 19, absent: 1 }, { name: "Computer Networks", total: 24, present: 23, absent: 1 }, { name: "Software Engineering", total: 20, present: 19, absent: 1 }, { name: "DBMS Lab", total: 10, present: 10, absent: 0 }] },
            // 21CS003 — Average attendance
            { rollNo: "21CS003", overall: 76, subjects: [{ name: "Data Structures", total: 24, present: 18, absent: 6 }, { name: "Operating Systems", total: 22, present: 17, absent: 5 }, { name: "DBMS", total: 20, present: 15, absent: 5 }, { name: "Computer Networks", total: 24, present: 18, absent: 6 }, { name: "Software Engineering", total: 20, present: 14, absent: 6 }] },
            // 21CS004 — Good attendance
            { rollNo: "21CS004", overall: 91, subjects: [{ name: "Data Structures", total: 24, present: 22, absent: 2 }, { name: "Operating Systems", total: 22, present: 20, absent: 2 }, { name: "DBMS", total: 20, present: 18, absent: 2 }, { name: "Computer Networks", total: 24, present: 22, absent: 2 }, { name: "Software Engineering", total: 20, present: 18, absent: 2 }] },
            // 21CS005 — Low attendance (at risk)
            { rollNo: "21CS005", overall: 68, subjects: [{ name: "Data Structures", total: 24, present: 16, absent: 8 }, { name: "Operating Systems", total: 22, present: 15, absent: 7 }, { name: "DBMS", total: 20, present: 14, absent: 6 }, { name: "Computer Networks", total: 24, present: 16, absent: 8 }, { name: "Software Engineering", total: 20, present: 14, absent: 6 }] },
            // 21EC001 — Good attendance ECE
            { rollNo: "21EC001", overall: 84, subjects: [{ name: "VLSI Design", total: 22, present: 19, absent: 3 }, { name: "Digital Signal Processing", total: 22, present: 18, absent: 4 }, { name: "Microprocessors", total: 20, present: 17, absent: 3 }, { name: "Communication Systems", total: 22, present: 18, absent: 4 }, { name: "Control Systems", total: 20, present: 17, absent: 3 }] },
            // 21EC002 — Excellent attendance ECE
            { rollNo: "21EC002", overall: 97, subjects: [{ name: "VLSI Design", total: 22, present: 22, absent: 0 }, { name: "Digital Signal Processing", total: 22, present: 21, absent: 1 }, { name: "Microprocessors", total: 20, present: 20, absent: 0 }, { name: "Communication Systems", total: 22, present: 21, absent: 1 }, { name: "Control Systems", total: 20, present: 19, absent: 1 }] },
            // 21EC003 — Average ECE
            { rollNo: "21EC003", overall: 79, subjects: [{ name: "VLSI Design", total: 22, present: 17, absent: 5 }, { name: "Digital Signal Processing", total: 22, present: 17, absent: 5 }, { name: "Microprocessors", total: 20, present: 16, absent: 4 }, { name: "Communication Systems", total: 22, present: 17, absent: 5 }, { name: "Control Systems", total: 20, present: 16, absent: 4 }] },
            // 21ME001 — Good Mech
            { rollNo: "21ME001", overall: 88, subjects: [{ name: "Thermodynamics", total: 22, present: 20, absent: 2 }, { name: "Fluid Mechanics", total: 20, present: 17, absent: 3 }, { name: "Strength of Materials", total: 22, present: 19, absent: 3 }, { name: "Manufacturing Processes", total: 20, present: 18, absent: 2 }] },
            // 21ME002 — Average Mech
            { rollNo: "21ME002", overall: 73, subjects: [{ name: "Thermodynamics", total: 22, present: 16, absent: 6 }, { name: "Fluid Mechanics", total: 20, present: 14, absent: 6 }, { name: "Strength of Materials", total: 22, present: 16, absent: 6 }, { name: "Manufacturing Processes", total: 20, present: 16, absent: 4 }] },
            // 21CV001 — On leave, low attendance
            { rollNo: "21CV001", overall: 62, subjects: [{ name: "Structural Analysis", total: 18, present: 11, absent: 7 }, { name: "Surveying", total: 16, present: 10, absent: 6 }, { name: "Hydraulics", total: 18, present: 11, absent: 7 }] },
            // 21IT001 — Good IT
            { rollNo: "21IT001", overall: 89, subjects: [{ name: "Web Technologies", total: 20, present: 18, absent: 2 }, { name: "Cloud Computing", total: 18, present: 16, absent: 2 }, { name: "Software Testing", total: 18, present: 16, absent: 2 }, { name: "Data Analytics", total: 20, present: 18, absent: 2 }] },
            // 21IT002 — Average IT
            { rollNo: "21IT002", overall: 77, subjects: [{ name: "Web Technologies", total: 20, present: 15, absent: 5 }, { name: "Cloud Computing", total: 18, present: 14, absent: 4 }, { name: "Software Testing", total: 18, present: 14, absent: 4 }, { name: "Data Analytics", total: 20, present: 15, absent: 5 }] },
            // 21IT003 — Excellent IT
            { rollNo: "21IT003", overall: 93, subjects: [{ name: "Web Technologies", total: 20, present: 19, absent: 1 }, { name: "Cloud Computing", total: 18, present: 17, absent: 1 }, { name: "Software Testing", total: 18, present: 17, absent: 1 }, { name: "Data Analytics", total: 20, present: 19, absent: 1 }] },
        ];
        await Attendance.insertMany(attendanceData);
        console.log("✅ Unique attendance seeded for all 15 students");

        // ============================================================
        // 8. UNIQUE MARKS — Different for every student
        // ============================================================
        const marksData = [
            { rollNo: "student", subjects: [{ name: "Data Structures", ia1: 18, ia2: 17, assignment: 8, total: 43 }, { name: "Operating Systems", ia1: 16, ia2: 15, assignment: 7, total: 38 }, { name: "DBMS", ia1: 19, ia2: 18, assignment: 9, total: 46 }, { name: "Computer Networks", ia1: 14, ia2: 16, assignment: 7, total: 37 }, { name: "Software Engineering", ia1: 15, ia2: 14, assignment: 8, total: 37 }] },
            { rollNo: "21CS001", subjects: [{ name: "Data Structures", ia1: 22, ia2: 20, assignment: 9, total: 51 }, { name: "Operating Systems", ia1: 19, ia2: 18, assignment: 9, total: 46 }, { name: "DBMS", ia1: 21, ia2: 20, assignment: 10, total: 51 }, { name: "Computer Networks", ia1: 17, ia2: 18, assignment: 8, total: 43 }, { name: "Software Engineering", ia1: 18, ia2: 17, assignment: 9, total: 44 }] },
            { rollNo: "21CS002", subjects: [{ name: "Data Structures", ia1: 25, ia2: 24, assignment: 10, total: 59 }, { name: "Operating Systems", ia1: 23, ia2: 22, assignment: 10, total: 55 }, { name: "DBMS", ia1: 24, ia2: 25, assignment: 10, total: 59 }, { name: "Computer Networks", ia1: 22, ia2: 23, assignment: 9, total: 54 }, { name: "Software Engineering", ia1: 23, ia2: 22, assignment: 10, total: 55 }] },
            { rollNo: "21CS003", subjects: [{ name: "Data Structures", ia1: 14, ia2: 16, assignment: 7, total: 37 }, { name: "Operating Systems", ia1: 13, ia2: 15, assignment: 6, total: 34 }, { name: "DBMS", ia1: 15, ia2: 14, assignment: 7, total: 36 }, { name: "Computer Networks", ia1: 12, ia2: 14, assignment: 6, total: 32 }, { name: "Software Engineering", ia1: 13, ia2: 12, assignment: 7, total: 32 }] },
            { rollNo: "21CS004", subjects: [{ name: "Data Structures", ia1: 21, ia2: 22, assignment: 9, total: 52 }, { name: "Operating Systems", ia1: 20, ia2: 21, assignment: 9, total: 50 }, { name: "DBMS", ia1: 22, ia2: 21, assignment: 10, total: 53 }, { name: "Computer Networks", ia1: 19, ia2: 20, assignment: 9, total: 48 }, { name: "Software Engineering", ia1: 20, ia2: 21, assignment: 9, total: 50 }] },
            { rollNo: "21CS005", subjects: [{ name: "Data Structures", ia1: 10, ia2: 12, assignment: 5, total: 27 }, { name: "Operating Systems", ia1: 11, ia2: 10, assignment: 5, total: 26 }, { name: "DBMS", ia1: 12, ia2: 11, assignment: 6, total: 29 }, { name: "Computer Networks", ia1: 9, ia2: 11, assignment: 5, total: 25 }, { name: "Software Engineering", ia1: 10, ia2: 9, assignment: 5, total: 24 }] },
            { rollNo: "21EC001", subjects: [{ name: "VLSI Design", ia1: 20, ia2: 19, assignment: 8, total: 47 }, { name: "Digital Signal Processing", ia1: 18, ia2: 17, assignment: 8, total: 43 }, { name: "Microprocessors", ia1: 19, ia2: 18, assignment: 8, total: 45 }, { name: "Communication Systems", ia1: 17, ia2: 18, assignment: 7, total: 42 }, { name: "Control Systems", ia1: 16, ia2: 17, assignment: 7, total: 40 }] },
            { rollNo: "21EC002", subjects: [{ name: "VLSI Design", ia1: 24, ia2: 23, assignment: 10, total: 57 }, { name: "Digital Signal Processing", ia1: 22, ia2: 23, assignment: 9, total: 54 }, { name: "Microprocessors", ia1: 23, ia2: 24, assignment: 10, total: 57 }, { name: "Communication Systems", ia1: 21, ia2: 22, assignment: 9, total: 52 }, { name: "Control Systems", ia1: 22, ia2: 21, assignment: 9, total: 52 }] },
            { rollNo: "21EC003", subjects: [{ name: "VLSI Design", ia1: 15, ia2: 14, assignment: 6, total: 35 }, { name: "Digital Signal Processing", ia1: 14, ia2: 15, assignment: 6, total: 35 }, { name: "Microprocessors", ia1: 16, ia2: 14, assignment: 7, total: 37 }, { name: "Communication Systems", ia1: 13, ia2: 15, assignment: 6, total: 34 }, { name: "Control Systems", ia1: 14, ia2: 13, assignment: 6, total: 33 }] },
            { rollNo: "21ME001", subjects: [{ name: "Thermodynamics", ia1: 21, ia2: 20, assignment: 9, total: 50 }, { name: "Fluid Mechanics", ia1: 19, ia2: 20, assignment: 8, total: 47 }, { name: "Strength of Materials", ia1: 20, ia2: 19, assignment: 9, total: 48 }, { name: "Manufacturing Processes", ia1: 18, ia2: 19, assignment: 8, total: 45 }] },
            { rollNo: "21ME002", subjects: [{ name: "Thermodynamics", ia1: 13, ia2: 14, assignment: 6, total: 33 }, { name: "Fluid Mechanics", ia1: 12, ia2: 13, assignment: 5, total: 30 }, { name: "Strength of Materials", ia1: 14, ia2: 12, assignment: 6, total: 32 }, { name: "Manufacturing Processes", ia1: 13, ia2: 14, assignment: 6, total: 33 }] },
            { rollNo: "21CV001", subjects: [{ name: "Structural Analysis", ia1: 11, ia2: 10, assignment: 5, total: 26 }, { name: "Surveying", ia1: 10, ia2: 11, assignment: 5, total: 26 }, { name: "Hydraulics", ia1: 12, ia2: 10, assignment: 5, total: 27 }] },
            { rollNo: "21IT001", subjects: [{ name: "Web Technologies", ia1: 20, ia2: 21, assignment: 9, total: 50 }, { name: "Cloud Computing", ia1: 19, ia2: 20, assignment: 8, total: 47 }, { name: "Software Testing", ia1: 21, ia2: 19, assignment: 9, total: 49 }, { name: "Data Analytics", ia1: 18, ia2: 20, assignment: 8, total: 46 }] },
            { rollNo: "21IT002", subjects: [{ name: "Web Technologies", ia1: 15, ia2: 14, assignment: 7, total: 36 }, { name: "Cloud Computing", ia1: 14, ia2: 15, assignment: 6, total: 35 }, { name: "Software Testing", ia1: 16, ia2: 14, assignment: 7, total: 37 }, { name: "Data Analytics", ia1: 13, ia2: 15, assignment: 7, total: 35 }] },
            { rollNo: "21IT003", subjects: [{ name: "Web Technologies", ia1: 23, ia2: 22, assignment: 10, total: 55 }, { name: "Cloud Computing", ia1: 21, ia2: 22, assignment: 9, total: 52 }, { name: "Software Testing", ia1: 22, ia2: 23, assignment: 10, total: 55 }, { name: "Data Analytics", ia1: 22, ia2: 21, assignment: 9, total: 52 }] },
        ];
        await Mark.insertMany(marksData);
        console.log("✅ Unique marks seeded for all 15 students");

        // ============================================================
        // 9. UNIQUE FEES — Different amounts for every student
        // ============================================================
        const feesData = [
            { rollNo: "student", total: 57500, paid: 40000, due: 17500, history: [{ receipt: "REC-2026-S001", description: "Tuition Fee Sem 5", amount: 40000, date: "2026-01-10", status: "Paid" }] },
            { rollNo: "21CS001", total: 57500, paid: 45000, due: 12500, history: [{ receipt: "REC-2026-001", description: "Tuition Fee — Sem 5", amount: 25000, date: "2026-01-10", status: "Paid" }, { receipt: "REC-2025-CS01", description: "Tuition Fee — Sem 4", amount: 20000, date: "2025-07-15", status: "Paid" }, { receipt: "REC-2026-DUE1", description: "Exam Fee — Sem 5", amount: 12500, date: "Due Jun 30", status: "Pending" }] },
            { rollNo: "21CS002", total: 57500, paid: 57500, due: 0, history: [{ receipt: "REC-2026-002", description: "Tuition Fee — Sem 5 (Full)", amount: 57500, date: "2026-01-05", status: "Paid" }] },
            { rollNo: "21CS003", total: 57500, paid: 30000, due: 27500, history: [{ receipt: "REC-2026-003", description: "Partial Tuition Fee", amount: 30000, date: "2026-02-12", status: "Paid" }, { receipt: "REC-2026-DUE3", description: "Remaining Fee — Sem 5", amount: 27500, date: "Due Jun 30", status: "Pending" }] },
            { rollNo: "21CS004", total: 57500, paid: 50000, due: 7500, history: [{ receipt: "REC-2026-004", description: "Tuition + Bus Fee", amount: 50000, date: "2026-01-20", status: "Paid" }, { receipt: "REC-2026-DUE4", description: "Lab Fee", amount: 7500, date: "Due Jun 30", status: "Pending" }] },
            { rollNo: "21CS005", total: 57500, paid: 20000, due: 37500, history: [{ receipt: "REC-2026-005", description: "Advance Payment", amount: 20000, date: "2026-03-01", status: "Paid" }] },
            { rollNo: "21EC001", total: 55000, paid: 48000, due: 7000, history: [{ receipt: "REC-2026-EC01", description: "Tuition Fee ECE Sem 5", amount: 48000, date: "2026-01-15", status: "Paid" }, { receipt: "REC-2026-DECE1", description: "Lab Fee", amount: 7000, date: "Due Jun 30", status: "Pending" }] },
            { rollNo: "21EC002", total: 55000, paid: 55000, due: 0, history: [{ receipt: "REC-2026-EC02", description: "Full Fee ECE Sem 5", amount: 55000, date: "2026-01-03", status: "Paid" }] },
            { rollNo: "21EC003", total: 55000, paid: 35000, due: 20000, history: [{ receipt: "REC-2026-EC03", description: "Partial Fee", amount: 35000, date: "2026-02-18", status: "Paid" }] },
            { rollNo: "21ME001", total: 52000, paid: 52000, due: 0, history: [{ receipt: "REC-2026-ME01", description: "Full Mech Fee Sem 5", amount: 52000, date: "2026-01-08", status: "Paid" }] },
            { rollNo: "21ME002", total: 52000, paid: 28000, due: 24000, history: [{ receipt: "REC-2026-ME02", description: "Partial Mech Fee", amount: 28000, date: "2026-02-20", status: "Paid" }] },
            { rollNo: "21CV001", total: 50000, paid: 15000, due: 35000, history: [{ receipt: "REC-2026-CV01", description: "Partial Civil Fee (On Leave)", amount: 15000, date: "2026-01-25", status: "Paid" }] },
            { rollNo: "21IT001", total: 54000, paid: 54000, due: 0, history: [{ receipt: "REC-2026-IT01", description: "Full IT Fee Sem 3", amount: 54000, date: "2026-01-06", status: "Paid" }] },
            { rollNo: "21IT002", total: 54000, paid: 40000, due: 14000, history: [{ receipt: "REC-2026-IT02", description: "IT Partial Fee", amount: 40000, date: "2026-01-22", status: "Paid" }] },
            { rollNo: "21IT003", total: 54000, paid: 54000, due: 0, history: [{ receipt: "REC-2026-IT03", description: "Full IT Fee", amount: 54000, date: "2026-01-04", status: "Paid" }] },
        ];
        await Fee.insertMany(feesData);
        console.log("✅ Unique fees seeded for all 15 students");

        // ============================================================
        // 10. TIMETABLE
        // ============================================================
        await Timetable.insertMany([
            {
                dept: "CSE", sem: 5,
                slots: [
                    { day: "Mon", slots: ["DS", "OS", "—", "Lunch", "CN", "SE", "—"] },
                    { day: "Tue", slots: ["DBMS", "—", "DS", "Lunch", "DBMS Lab", "DBMS Lab", "DBMS Lab"] },
                    { day: "Wed", slots: ["OS", "CN", "SE", "Lunch", "DBMS", "—", "—"] },
                    { day: "Thu", slots: ["DS", "DBMS", "—", "Lunch", "CN Lab", "CN Lab", "CN Lab"] },
                    { day: "Fri", slots: ["CN", "OS", "DS", "Lunch", "SE", "DBMS", "—"] }
                ]
            },
            {
                dept: "ECE", sem: 5,
                slots: [
                    { day: "Mon", slots: ["VLSI", "DSP", "—", "Lunch", "Comm", "Control", "—"] },
                    { day: "Tue", slots: ["Microproc", "—", "VLSI", "Lunch", "VLSI Lab", "VLSI Lab", "VLSI Lab"] },
                    { day: "Wed", slots: ["DSP", "Control", "Comm", "Lunch", "Microproc", "—", "—"] },
                    { day: "Thu", slots: ["VLSI", "Microproc", "—", "Lunch", "DSP Lab", "DSP Lab", "DSP Lab"] },
                    { day: "Fri", slots: ["Comm", "DSP", "VLSI", "Lunch", "Control", "Microproc", "—"] }
                ]
            },
            {
                dept: "IT", sem: 3,
                slots: [
                    { day: "Mon", slots: ["WT", "Cloud", "—", "Lunch", "DA", "ST", "—"] },
                    { day: "Tue", slots: ["Cloud", "—", "WT", "Lunch", "Web Lab", "Web Lab", "Web Lab"] },
                    { day: "Wed", slots: ["ST", "DA", "Cloud", "Lunch", "WT", "—", "—"] },
                    { day: "Thu", slots: ["WT", "Cloud", "—", "Lunch", "Cloud Lab", "Cloud Lab", "Cloud Lab"] },
                    { day: "Fri", slots: ["DA", "ST", "WT", "Lunch", "Cloud", "DA", "—"] }
                ]
            },
        ]);
        console.log("✅ Timetables seeded (CSE, ECE, IT)");

        // ============================================================
        // 11. ASSIGNMENTS
        // ============================================================
        const facultyAssignments = [
            { title: "Binary Tree Implementation", course: "CS3351 / 21CS-A", desc: "Implement BST with insert, delete, and all traversal methods. Include AVL balancing.", due: "2026-06-10", maxMarks: 10, status: "Active", submissions: 42, faculty: "Dr. Ramesh Kumar" },
            { title: "Sorting Algorithm Analysis", course: "CS3351 / 21CS-B", desc: "Compare QuickSort, MergeSort, HeapSort with empirical runtime analysis. Plot graphs.", due: "2026-06-12", maxMarks: 10, status: "Active", submissions: 38, faculty: "Dr. Ramesh Kumar" },
            { title: "Linked List Lab Program", course: "CS3352 / 21CS-A", desc: "Design a doubly linked list simulation for dynamic queue management.", due: "2026-05-30", maxMarks: 20, status: "Closed", submissions: 60, faculty: "Dr. Ramesh Kumar" },
            { title: "VLSI Counter Design", course: "EC3351 / 21EC-A", desc: "Design a 4-bit synchronous counter using D flip-flops. Simulate in ModelSim.", due: "2026-06-15", maxMarks: 15, status: "Active", submissions: 28, faculty: "Dr. Anand Rajan" },
            { title: "Cloud Architecture Report", course: "IT3301 / 21IT-A", desc: "Design a 3-tier cloud architecture for a hospital management system.", due: "2026-06-18", maxMarks: 10, status: "Active", submissions: 15, faculty: "Dr. Deepa Srinivasan" },
        ];
        const savedAssignments = await Assignment.insertMany(facultyAssignments);

        // Student Assignments — for CS students and demo
        const studentAssignments = [
            // Demo student
            { rollNo: "student", assignmentId: savedAssignments[0]._id, title: "Binary Tree Implementation", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-10", status: "pending" },
            { rollNo: "student", assignmentId: savedAssignments[1]._id, title: "Sorting Algorithm Analysis", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-12", status: "pending" },
            { rollNo: "student", assignmentId: savedAssignments[2]._id, title: "Linked List Lab Program", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-05-30", status: "submitted" },
            // 21CS001
            { rollNo: "21CS001", assignmentId: savedAssignments[0]._id, title: "Binary Tree Implementation", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-10", status: "submitted" },
            { rollNo: "21CS001", assignmentId: savedAssignments[1]._id, title: "Sorting Algorithm Analysis", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-12", status: "pending" },
            { rollNo: "21CS001", assignmentId: savedAssignments[2]._id, title: "Linked List Lab Program", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-05-30", status: "submitted" },
            // 21CS002
            { rollNo: "21CS002", assignmentId: savedAssignments[0]._id, title: "Binary Tree Implementation", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-10", status: "submitted" },
            { rollNo: "21CS002", assignmentId: savedAssignments[1]._id, title: "Sorting Algorithm Analysis", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-12", status: "submitted" },
            { rollNo: "21CS002", assignmentId: savedAssignments[2]._id, title: "Linked List Lab Program", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-05-30", status: "submitted" },
            // 21CS003 — behind on assignments
            { rollNo: "21CS003", assignmentId: savedAssignments[0]._id, title: "Binary Tree Implementation", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-10", status: "pending" },
            { rollNo: "21CS003", assignmentId: savedAssignments[1]._id, title: "Sorting Algorithm Analysis", subject: "Data Structures", faculty: "Dr. Ramesh Kumar", due: "2026-06-12", status: "pending" },
            // 21EC001
            { rollNo: "21EC001", assignmentId: savedAssignments[3]._id, title: "VLSI Counter Design", subject: "VLSI Design", faculty: "Dr. Anand Rajan", due: "2026-06-15", status: "pending" },
            // 21IT001
            { rollNo: "21IT001", assignmentId: savedAssignments[4]._id, title: "Cloud Architecture Report", subject: "Cloud Computing", faculty: "Dr. Deepa Srinivasan", due: "2026-06-18", status: "submitted" },
            // 21IT002
            { rollNo: "21IT002", assignmentId: savedAssignments[4]._id, title: "Cloud Architecture Report", subject: "Cloud Computing", faculty: "Dr. Deepa Srinivasan", due: "2026-06-18", status: "pending" },
        ];
        await StudentAssignment.insertMany(studentAssignments);
        console.log("✅ Assignments and student assignments seeded");

        // ============================================================
        // 12. LEAVE APPLICATIONS — unique per student
        // ============================================================
        await LeaveApplication.insertMany([
            { roll: "21CS001", name: "Arjun Ramesh", type: "Medical Leave", from: "2026-05-10", to: "2026-05-12", reason: "High fever and throat infection", status: "Approved", appliedOn: "2026-05-08" },
            { roll: "21CS001", name: "Arjun Ramesh", type: "Personal Leave", from: "2026-04-05", to: "2026-04-05", reason: "Elder sister's wedding function", status: "Pending", appliedOn: "2026-04-03" },
            { roll: "21CS002", name: "Priya Lakshmi", type: "Family Emergency", from: "2026-05-20", to: "2026-05-22", reason: "Father hospitalized — emergency", status: "Approved", appliedOn: "2026-05-19" },
            { roll: "21CS005", name: "Surya Prakash", type: "Medical Leave", from: "2026-04-10", to: "2026-04-16", reason: "Dengue fever — doctor certificate attached", status: "Approved", appliedOn: "2026-04-09" },
            { roll: "21CS005", name: "Surya Prakash", type: "Personal Leave", from: "2026-05-01", to: "2026-05-03", reason: "Out of town family event", status: "Rejected", appliedOn: "2026-04-28" },
            { roll: "21EC001", name: "Rahul Sharma", type: "Medical Leave", from: "2026-05-15", to: "2026-05-16", reason: "Minor accident — fractured finger", status: "Approved", appliedOn: "2026-05-14" },
            { roll: "21CV001", name: "Karthik Raj", type: "Prolonged Medical Leave", from: "2026-04-01", to: "2026-07-01", reason: "Major surgery and recovery — submitted medical certificate", status: "Approved", appliedOn: "2026-03-28" },
            { roll: "student", name: "Demo Student", type: "Personal Leave", from: "2026-06-10", to: "2026-06-10", reason: "Family function — request approval", status: "Pending", appliedOn: "2026-06-05" },
        ]);
        console.log("✅ Leave applications seeded");

        // ============================================================
        // 13. NOTIFICATIONS — unique per student
        // ============================================================
        await Notification.insertMany([
            // Demo student
            { rollNo: "student", icon: "📢", title: "IA 2 Scheduled", message: "IA 2 for all 5th sem subjects is scheduled June 15, 2026.", time: "Today, 10:30 AM", isNew: true },
            { rollNo: "student", icon: "💳", title: "Fee Reminder", message: "Fee of ₹17,500 is due June 30, 2026.", time: "Yesterday, 3:00 PM", isNew: true },
            // 21CS001
            { rollNo: "21CS001", icon: "📢", title: "Assignment Due Tomorrow", message: "Binary Tree Implementation assignment is due June 10. Submit via portal.", time: "Today, 9:00 AM", isNew: true },
            { rollNo: "21CS001", icon: "📋", title: "Attendance Updated", message: "Your attendance for May 2026: 87%. Keep it up!", time: "May 31, 2026", isNew: false },
            { rollNo: "21CS001", icon: "💳", title: "Fee Payment Reminder", message: "Exam fee ₹12,500 is due June 30, 2026.", time: "May 28, 2026", isNew: false },
            // 21CS002
            { rollNo: "21CS002", icon: "🏆", title: "Academic Excellence", message: "Congratulations! You have the highest attendance in class (95%). Keep it up!", time: "Today, 11:00 AM", isNew: true },
            { rollNo: "21CS002", icon: "📢", title: "Placement Drive", message: "Amazon placement drive on July 5. Register by June 20 via placement portal.", time: "Today, 8:30 AM", isNew: true },
            // 21CS003
            { rollNo: "21CS003", icon: "⚠️", title: "Attendance Warning", message: "Your attendance is 76% — approaching the 75% threshold. Please attend all classes.", time: "Today, 10:00 AM", isNew: true },
            { rollNo: "21CS003", icon: "📝", title: "Assignment Pending", message: "2 assignments pending submission. Deadline approaching.", time: "Yesterday, 4:00 PM", isNew: true },
            // 21CS004
            { rollNo: "21CS004", icon: "📢", title: "Result Published", message: "Semester 4 results published. Check your results in the portal.", time: "Today, 9:30 AM", isNew: true },
            // 21CS005
            { rollNo: "21CS005", icon: "🚨", title: "URGENT: Low Attendance", message: "CRITICAL: Your attendance is 68% — below minimum 75%. You may be barred from exams.", time: "Today, 8:00 AM", isNew: true },
            { rollNo: "21CS005", icon: "💳", title: "Fee Overdue", message: "Fee of ₹37,500 is overdue. Please pay immediately to avoid late charges.", time: "Yesterday, 2:00 PM", isNew: true },
            // 21EC001
            { rollNo: "21EC001", icon: "📢", title: "VLSI Assignment Posted", message: "Dr. Anand has uploaded VLSI Counter Design assignment. Due: June 15.", time: "Yesterday, 3:30 PM", isNew: true },
            { rollNo: "21EC001", icon: "📋", title: "Leave Approved", message: "Your medical leave from May 15-16 has been approved.", time: "May 16, 2026", isNew: false },
            // 21IT001
            { rollNo: "21IT001", icon: "🏆", title: "Assignment Graded", message: "Your Cloud Architecture Report has been graded. Score: 9/10.", time: "Today, 10:00 AM", isNew: true },
            // 21IT003
            { rollNo: "21IT003", icon: "🏆", title: "Top Performer", message: "You are ranked #1 in IT Dept. for attendance and marks this semester!", time: "Today, 9:00 AM", isNew: true },
            // 21CV001
            { rollNo: "21CV001", icon: "📋", title: "Extended Leave Status", message: "Your extended medical leave is approved until July 1, 2026.", time: "April 1, 2026", isNew: false },
        ]);
        console.log("✅ Unique notifications seeded per student");

        // ============================================================
        // 14. SEMESTER RESULTS — unique GPA per student
        // ============================================================
        await Result.insertMany([
            { rollNo: "student", sem3: { gpa: 7.8, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "B+", points: 8 }, { name: "Computer Architecture", credits: 3, grade: "B", points: 7 }, { name: "Discrete Mathematics", credits: 4, grade: "B+", points: 8 }, { name: "OOP with Java", credits: 3, grade: "B", points: 7 }, { name: "Digital Electronics", credits: 3, grade: "B+", points: 8 }] }, sem4: { gpa: 8.0, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "B+", points: 8 }, { name: "DBMS", credits: 4, grade: "A", points: 9 }, { name: "Computer Networks", credits: 3, grade: "B", points: 7 }, { name: "Software Engineering", credits: 3, grade: "B+", points: 8 }, { name: "Web Technology", credits: 3, grade: "B", points: 7 }] } },
            { rollNo: "21CS001", sem3: { gpa: 8.2, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "A", points: 9 }, { name: "Computer Architecture", credits: 3, grade: "B+", points: 8 }, { name: "Discrete Mathematics", credits: 4, grade: "A+", points: 10 }, { name: "OOP with Java", credits: 3, grade: "A", points: 9 }, { name: "Digital Electronics", credits: 3, grade: "B", points: 7 }] }, sem4: { gpa: 8.5, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "A", points: 9 }, { name: "DBMS", credits: 4, grade: "A+", points: 10 }, { name: "Computer Networks", credits: 3, grade: "B+", points: 8 }, { name: "Software Engineering", credits: 3, grade: "A", points: 9 }, { name: "Web Technology", credits: 3, grade: "A", points: 9 }] } },
            { rollNo: "21CS002", sem3: { gpa: 9.4, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "A+", points: 10 }, { name: "Computer Architecture", credits: 3, grade: "A", points: 9 }, { name: "Discrete Mathematics", credits: 4, grade: "A+", points: 10 }, { name: "OOP with Java", credits: 3, grade: "A+", points: 10 }, { name: "Digital Electronics", credits: 3, grade: "A", points: 9 }] }, sem4: { gpa: 9.6, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "A+", points: 10 }, { name: "DBMS", credits: 4, grade: "A+", points: 10 }, { name: "Computer Networks", credits: 3, grade: "A", points: 9 }, { name: "Software Engineering", credits: 3, grade: "A+", points: 10 }, { name: "Web Technology", credits: 3, grade: "A", points: 9 }] } },
            { rollNo: "21CS003", sem3: { gpa: 6.8, result: "Pass", arrears: 1, subjects: [{ name: "Data Structures", credits: 4, grade: "C", points: 5 }, { name: "Computer Architecture", credits: 3, grade: "B", points: 7 }, { name: "Discrete Mathematics", credits: 4, grade: "U", points: 0 }, { name: "OOP with Java", credits: 3, grade: "B", points: 7 }, { name: "Digital Electronics", credits: 3, grade: "C", points: 5 }] }, sem4: { gpa: 7.2, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "B", points: 7 }, { name: "DBMS", credits: 4, grade: "B+", points: 8 }, { name: "Computer Networks", credits: 3, grade: "C", points: 5 }, { name: "Software Engineering", credits: 3, grade: "B", points: 7 }, { name: "Web Technology", credits: 3, grade: "B", points: 7 }] } },
            { rollNo: "21CS004", sem3: { gpa: 8.7, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "A", points: 9 }, { name: "Computer Architecture", credits: 3, grade: "A", points: 9 }, { name: "Discrete Mathematics", credits: 4, grade: "A+", points: 10 }, { name: "OOP with Java", credits: 3, grade: "A", points: 9 }, { name: "Digital Electronics", credits: 3, grade: "B+", points: 8 }] }, sem4: { gpa: 8.9, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "A", points: 9 }, { name: "DBMS", credits: 4, grade: "A+", points: 10 }, { name: "Computer Networks", credits: 3, grade: "A", points: 9 }, { name: "Software Engineering", credits: 3, grade: "A", points: 9 }, { name: "Web Technology", credits: 3, grade: "B+", points: 8 }] } },
            { rollNo: "21CS005", sem3: { gpa: 5.4, result: "Pass with Arrears", arrears: 2, subjects: [{ name: "Data Structures", credits: 4, grade: "U", points: 0 }, { name: "Computer Architecture", credits: 3, grade: "C", points: 5 }, { name: "Discrete Mathematics", credits: 4, grade: "U", points: 0 }, { name: "OOP with Java", credits: 3, grade: "C", points: 5 }, { name: "Digital Electronics", credits: 3, grade: "C", points: 5 }] }, sem4: { gpa: 6.1, result: "Pass", arrears: 0, subjects: [{ name: "Operating Systems", credits: 4, grade: "C", points: 5 }, { name: "DBMS", credits: 4, grade: "B", points: 7 }, { name: "Computer Networks", credits: 3, grade: "C", points: 5 }, { name: "Software Engineering", credits: 3, grade: "C", points: 5 }, { name: "Web Technology", credits: 3, grade: "B", points: 7 }] } },
            { rollNo: "21EC001", sem3: { gpa: 7.9, result: "Pass", arrears: 0, subjects: [{ name: "Circuit Theory", credits: 4, grade: "B+", points: 8 }, { name: "Electronic Devices", credits: 3, grade: "B+", points: 8 }, { name: "Digital Electronics", credits: 4, grade: "A", points: 9 }, { name: "Signals & Systems", credits: 3, grade: "B", points: 7 }] }, sem4: { gpa: 8.1, result: "Pass", arrears: 0, subjects: [{ name: "VLSI Design", credits: 4, grade: "B+", points: 8 }, { name: "Microprocessors", credits: 3, grade: "A", points: 9 }, { name: "Communication Theory", credits: 3, grade: "B+", points: 8 }, { name: "Control Systems", credits: 4, grade: "B+", points: 8 }] } },
            { rollNo: "21EC002", sem3: { gpa: 9.2, result: "Pass", arrears: 0, subjects: [{ name: "Circuit Theory", credits: 4, grade: "A+", points: 10 }, { name: "Electronic Devices", credits: 3, grade: "A", points: 9 }, { name: "Digital Electronics", credits: 4, grade: "A+", points: 10 }, { name: "Signals & Systems", credits: 3, grade: "A", points: 9 }] }, sem4: { gpa: 9.4, result: "Pass", arrears: 0, subjects: [{ name: "VLSI Design", credits: 4, grade: "A+", points: 10 }, { name: "Microprocessors", credits: 3, grade: "A+", points: 10 }, { name: "Communication Theory", credits: 3, grade: "A", points: 9 }, { name: "Control Systems", credits: 4, grade: "A", points: 9 }] } },
            { rollNo: "21IT001", sem3: { gpa: 8.5, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "A", points: 9 }, { name: "Web Technologies", credits: 3, grade: "A+", points: 10 }, { name: "OS & Networks", credits: 3, grade: "B+", points: 8 }, { name: "Python Programming", credits: 4, grade: "A", points: 9 }] }, sem4: { gpa: 8.8, result: "Pass", arrears: 0, subjects: [{ name: "Cloud Computing", credits: 4, grade: "A", points: 9 }, { name: "Software Testing", credits: 3, grade: "A", points: 9 }, { name: "Data Analytics", credits: 3, grade: "A+", points: 10 }, { name: "Mobile App Dev", credits: 4, grade: "A", points: 9 }] } },
            { rollNo: "21IT003", sem3: { gpa: 9.1, result: "Pass", arrears: 0, subjects: [{ name: "Data Structures", credits: 4, grade: "A+", points: 10 }, { name: "Web Technologies", credits: 3, grade: "A+", points: 10 }, { name: "OS & Networks", credits: 3, grade: "A", points: 9 }, { name: "Python Programming", credits: 4, grade: "A+", points: 10 }] }, sem4: { gpa: 9.3, result: "Pass", arrears: 0, subjects: [{ name: "Cloud Computing", credits: 4, grade: "A+", points: 10 }, { name: "Software Testing", credits: 3, grade: "A", points: 9 }, { name: "Data Analytics", credits: 3, grade: "A+", points: 10 }, { name: "Mobile App Dev", credits: 4, grade: "A", points: 9 }] } },
        ]);
        console.log("✅ Unique semester results seeded");

        // ============================================================
        // 15. EXAM SCHEDULES
        // ============================================================
        await ExamSchedule.insertMany([
            { dept: "CSE", sem: 5, subjectCode: "CS3351", subjectName: "Data Structures", examDate: "2026-07-15", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-102" },
            { dept: "CSE", sem: 5, subjectCode: "CS3352", subjectName: "Operating Systems", examDate: "2026-07-18", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-102" },
            { dept: "CSE", sem: 5, subjectCode: "CS3353", subjectName: "Database Management Systems", examDate: "2026-07-21", session: "AN (1:30 PM - 4:30 PM)", hallNo: "LH-103" },
            { dept: "CSE", sem: 5, subjectCode: "CS3354", subjectName: "Computer Networks", examDate: "2026-07-24", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-102" },
            { dept: "CSE", sem: 5, subjectCode: "CS3355", subjectName: "Software Engineering", examDate: "2026-07-27", session: "AN (1:30 PM - 4:30 PM)", hallNo: "LH-103" },
            { dept: "ECE", sem: 5, subjectCode: "EC3351", subjectName: "VLSI Design", examDate: "2026-07-16", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-201" },
            { dept: "ECE", sem: 5, subjectCode: "EC3352", subjectName: "Digital Signal Processing", examDate: "2026-07-19", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-201" },
            { dept: "ECE", sem: 5, subjectCode: "EC3353", subjectName: "Microprocessors & Microcontrollers", examDate: "2026-07-22", session: "AN (1:30 PM - 4:30 PM)", hallNo: "LH-202" },
            { dept: "IT", sem: 3, subjectCode: "IT3301", subjectName: "Web Technologies", examDate: "2026-07-17", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-301" },
            { dept: "IT", sem: 3, subjectCode: "IT3302", subjectName: "Cloud Computing", examDate: "2026-07-20", session: "FN (9:30 AM - 12:30 PM)", hallNo: "LH-301" },
        ]);
        console.log("✅ Exam schedules seeded");

        // ============================================================
        // 16. ACTIVITY LOGS
        // ============================================================
        await ActivityLog.insertMany([
            { user: "admin", action: "System initialized", details: "All database collections seeded with fresh data", timestamp: new Date().toISOString() },
            { user: "admin", action: "Added new faculty", details: "Dr. Deepa Srinivasan — IT Dept", timestamp: new Date(Date.now() - 3600000).toISOString() },
            { user: "admin", action: "Updated placement data", details: "Added Amazon and Zoho placement drives", timestamp: new Date(Date.now() - 7200000).toISOString() },
        ]);

        // ============================================================
        // 17. ADMISSION APPLICATIONS — 12 realistic public applicants
        // ============================================================
        const admissionApps = [
            { appId: `APP-2026-100001`, name: "Arun Kumar Rajesh", firstName: "Arun Kumar", lastName: "Rajesh", email: "arun.r@gmail.com", phone: "9876500101", gender: "Male", dob: "2007-04-12", community: "OC", religion: "Hindu", nationality: "Indian", bloodGroup: "O+", aadharNumber: "123412341234", address: "12, MG Road", city: "Chennai", state: "Tamil Nadu", pincode: "600001", parentName: "Rajesh Kumar", parentOccupation: "Engineer", parentIncome: "800000", parentMobile: "9876500100", schoolName: "SBOA School", tenthBoard: "CBSE", tenthPercent: "95.2", tenthYearPassing: "2023", collegeName: "Sri Venkateswara College", twelfthBoard: "stateboard", twelfthPercent: "96.4", twelfthPhysics: "98", twelfthChemistry: "95", twelfthMaths: "99", yearPassing: "2025", tneaNo: "TN2025001", department: "cse", admissionType: "tnea", hostelRequired: "no", transportRequired: "yes", status: "Pending", type: "admission", date: "2026-06-01" },
            { appId: `APP-2026-100002`, name: "Meena Rajeshwari", firstName: "Meena", lastName: "Rajeshwari", email: "meena.rw@yahoo.com", phone: "9876500102", gender: "Female", dob: "2007-07-22", community: "OBC", religion: "Hindu", nationality: "Indian", bloodGroup: "A+", aadharNumber: "234523452345", address: "45, Anna Salai", city: "Coimbatore", state: "Tamil Nadu", pincode: "641001", parentName: "Rajeshwari S", parentOccupation: "Teacher", parentIncome: "550000", parentMobile: "9876500103", schoolName: "Bharatiya Vidya Bhavan", tenthBoard: "stateboard", tenthPercent: "92.8", tenthYearPassing: "2023", collegeName: "Stanes Higher Secondary", twelfthBoard: "stateboard", twelfthPercent: "93.6", twelfthPhysics: "92", twelfthChemistry: "94", twelfthMaths: "97", yearPassing: "2025", tneaNo: "TN2025002", department: "ece", admissionType: "tnea", hostelRequired: "yes", transportRequired: "no", status: "Under Review", type: "admission", date: "2026-06-02" },
            { appId: `APP-2026-100003`, name: "Vijay Sethupathi Kumar", firstName: "Vijay", lastName: "Sethupathi Kumar", email: "vijay.sk@hotmail.com", phone: "9876500103", gender: "Male", dob: "2007-01-15", community: "MBC", religion: "Hindu", nationality: "Indian", bloodGroup: "B+", aadharNumber: "345634563456", address: "78, Nehru Street", city: "Madurai", state: "Tamil Nadu", pincode: "625001", parentName: "Sethupathi R", parentOccupation: "Business", parentIncome: "1200000", parentMobile: "9876500104", schoolName: "Jawahar HS School", tenthBoard: "stateboard", tenthPercent: "88.5", tenthYearPassing: "2023", collegeName: "Sourashtra College", twelfthBoard: "stateboard", twelfthPercent: "89.2", twelfthPhysics: "87", twelfthChemistry: "90", twelfthMaths: "92", yearPassing: "2025", tneaNo: "", department: "mech", admissionType: "management", hostelRequired: "yes", transportRequired: "no", status: "Pending", type: "admission", date: "2026-06-02" },
            { appId: `APP-2026-100004`, name: "Lakshmi Priya Kannan", firstName: "Lakshmi", lastName: "Priya Kannan", email: "lakshmi.pk@gmail.com", phone: "9876500104", gender: "Female", dob: "2007-09-08", community: "SC", religion: "Hindu", nationality: "Indian", bloodGroup: "AB+", aadharNumber: "456745674567", address: "23, Park Street", city: "Trichy", state: "Tamil Nadu", pincode: "620001", parentName: "Kannan P", parentOccupation: "Farmer", parentIncome: "180000", parentMobile: "9876500105", schoolName: "Government HS School", tenthBoard: "stateboard", tenthPercent: "91.4", tenthYearPassing: "2023", collegeName: "Bishop Heber College HS", twelfthBoard: "stateboard", twelfthPercent: "90.8", twelfthPhysics: "92", twelfthChemistry: "88", twelfthMaths: "94", yearPassing: "2025", tneaNo: "TN2025004", department: "civil", admissionType: "tnea", hostelRequired: "yes", transportRequired: "no", status: "Document Verification", type: "admission", date: "2026-06-03" },
            { appId: `APP-2026-100005`, name: "Rahul Venkatesh Iyer", firstName: "Rahul", lastName: "Venkatesh Iyer", email: "rahul.vi@gmail.com", phone: "9876500105", gender: "Male", dob: "2007-03-20", community: "BC", religion: "Hindu", nationality: "Indian", bloodGroup: "O-", aadharNumber: "567856785678", address: "56, Gandhi Road", city: "Salem", state: "Tamil Nadu", pincode: "636001", parentName: "Venkatesh Iyer", parentOccupation: "IT Professional", parentIncome: "950000", parentMobile: "9876500106", schoolName: "Sishya School", tenthBoard: "CBSE", tenthPercent: "94.6", tenthYearPassing: "2023", collegeName: "NM KVHSS", twelfthBoard: "stateboard", twelfthPercent: "95.2", twelfthPhysics: "96", twelfthChemistry: "93", twelfthMaths: "98", yearPassing: "2025", tneaNo: "TN2025005", department: "it", admissionType: "tnea", hostelRequired: "no", transportRequired: "yes", status: "Approved", type: "admission", date: "2026-06-03" },
            { appId: `APP-2026-100006`, name: "Divya Sharma Krishnamurthy", firstName: "Divya", lastName: "Sharma Krishnamurthy", email: "divya.sk@gmail.com", phone: "9876500106", gender: "Female", dob: "2007-11-30", community: "OC", religion: "Hindu", nationality: "Indian", bloodGroup: "B-", aadharNumber: "678967896789", address: "34, Lake View", city: "Vellore", state: "Tamil Nadu", pincode: "632001", parentName: "Krishnamurthy S", parentOccupation: "Doctor", parentIncome: "1800000", parentMobile: "9876500107", schoolName: "VIT School", tenthBoard: "CBSE", tenthPercent: "96.8", tenthYearPassing: "2023", collegeName: "Don Bosco MHSS", twelfthBoard: "CBSE", twelfthPercent: "94.0", twelfthPhysics: "95", twelfthChemistry: "92", twelfthMaths: "97", yearPassing: "2025", tneaNo: "", department: "cse", admissionType: "management", hostelRequired: "no", transportRequired: "no", status: "Pending", type: "admission", date: "2026-06-04" },
            { appId: `APP-2026-100007`, name: "Suresh Muthuswamy", firstName: "Suresh", lastName: "Muthuswamy", email: "suresh.m@gmail.com", phone: "9876500107", gender: "Male", dob: "2007-06-25", community: "OC", religion: "Hindu", nationality: "Indian", bloodGroup: "A-", aadharNumber: "789078907890", address: "67, Beach Road", city: "Kanyakumari", state: "Tamil Nadu", pincode: "629001", parentName: "Muthuswamy R", parentOccupation: "Govt Employee", parentIncome: "650000", parentMobile: "9876500108", schoolName: "Kendriya Vidyalaya", tenthBoard: "CBSE", tenthPercent: "97.2", tenthYearPassing: "2023", collegeName: "Cape Town School", twelfthBoard: "CBSE", twelfthPercent: "97.8", twelfthPhysics: "99", twelfthChemistry: "97", twelfthMaths: "100", yearPassing: "2025", tneaNo: "TN2025007", department: "cse", admissionType: "tnea", hostelRequired: "yes", transportRequired: "no", status: "Approved", type: "admission", date: "2026-06-04" },
            { appId: `APP-2026-100008`, name: "Kavitha Devi Pandian", firstName: "Kavitha", lastName: "Devi Pandian", email: "kavitha.dp@yahoo.com", phone: "9876500108", gender: "Female", dob: "2007-08-14", community: "ST", religion: "Christian", nationality: "Indian", bloodGroup: "AB-", aadharNumber: "890189018901", address: "89, Ooty Road", city: "Coimbatore", state: "Tamil Nadu", pincode: "641002", parentName: "Pandian K", parentOccupation: "Social Worker", parentIncome: "120000", parentMobile: "9876500109", schoolName: "Tribal Welfare HS", tenthBoard: "stateboard", tenthPercent: "84.6", tenthYearPassing: "2023", collegeName: "Hill View HSS", twelfthBoard: "stateboard", twelfthPercent: "86.2", twelfthPhysics: "84", twelfthChemistry: "85", twelfthMaths: "90", yearPassing: "2025", tneaNo: "TN2025008", department: "ece", admissionType: "tnea", hostelRequired: "yes", transportRequired: "no", status: "Document Verification", type: "admission", date: "2026-06-05" },
            { appId: `APP-2026-100009`, name: "Prakash Kumar Narayanan", firstName: "Prakash", lastName: "Kumar Narayanan", email: "prakash.kn@gmail.com", phone: "9876500109", gender: "Male", dob: "2007-02-28", community: "OBC", religion: "Hindu", nationality: "Indian", bloodGroup: "O+", aadharNumber: "901290129012", address: "101, River Side", city: "Tirunelveli", state: "Tamil Nadu", pincode: "627001", parentName: "Narayanan K", parentOccupation: "Mechanic", parentIncome: "240000", parentMobile: "9876500110", schoolName: "St. Johns HS", tenthBoard: "stateboard", tenthPercent: "82.4", tenthYearPassing: "2023", collegeName: "SXCAS", twelfthBoard: "stateboard", twelfthPercent: "83.8", twelfthPhysics: "80", twelfthChemistry: "85", twelfthMaths: "88", yearPassing: "2025", tneaNo: "", department: "mech", admissionType: "tnea", hostelRequired: "no", transportRequired: "no", status: "Pending", type: "admission", date: "2026-06-05" },
            { appId: `APP-2026-100010`, name: "Anjali Menon Subramaniam", firstName: "Anjali", lastName: "Menon Subramaniam", email: "anjali.ms@gmail.com", phone: "9876500110", gender: "Female", dob: "2007-12-10", community: "OC", religion: "Hindu", nationality: "Indian", bloodGroup: "A+", aadharNumber: "012301230123", address: "14, Civil Lines", city: "Chennai", state: "Tamil Nadu", pincode: "600002", parentName: "Subramaniam M", parentOccupation: "Lawyer", parentIncome: "1600000", parentMobile: "9876500111", schoolName: "PSBB School", tenthBoard: "CBSE", tenthPercent: "98.4", tenthYearPassing: "2023", collegeName: "PSBB HS", twelfthBoard: "CBSE", twelfthPercent: "97.2", twelfthPhysics: "98", twelfthChemistry: "96", twelfthMaths: "99", yearPassing: "2025", tneaNo: "TN2025010", department: "cse", admissionType: "tnea", hostelRequired: "no", transportRequired: "no", status: "Under Review", type: "admission", date: "2026-06-06" },
            { appId: `APP-2026-100011`, name: "Mohammed Irfan Khan", firstName: "Mohammed", lastName: "Irfan Khan", email: "irfan.mk@gmail.com", phone: "9876500111", gender: "Male", dob: "2007-05-17", community: "BC", religion: "Islam", nationality: "Indian", bloodGroup: "B+", aadharNumber: "112211221122", address: "55, Mosque Street", city: "Chennai", state: "Tamil Nadu", pincode: "600010", parentName: "Abdul Khan", parentOccupation: "Businessman", parentIncome: "900000", parentMobile: "9876500112", schoolName: "Islamia School", tenthBoard: "stateboard", tenthPercent: "89.6", tenthYearPassing: "2023", collegeName: "Islamia College HS", twelfthBoard: "stateboard", twelfthPercent: "91.4", twelfthPhysics: "90", twelfthChemistry: "92", twelfthMaths: "95", yearPassing: "2025", tneaNo: "TN2025011", department: "it", admissionType: "tnea", hostelRequired: "yes", transportRequired: "no", status: "Pending", type: "admission", date: "2026-06-06" },
            { appId: `APP-2026-100012`, name: "Sangeetha Ramamurthy", firstName: "Sangeetha", lastName: "Ramamurthy", email: "sangeetha.r@gmail.com", phone: "9876500112", gender: "Female", dob: "2007-10-03", community: "BC", religion: "Hindu", nationality: "Indian", bloodGroup: "AB+", aadharNumber: "223322332233", address: "77, Poes Garden", city: "Chennai", state: "Tamil Nadu", pincode: "600086", parentName: "Ramamurthy V", parentOccupation: "Professor", parentIncome: "1100000", parentMobile: "9876500113", schoolName: "DAV School", tenthBoard: "CBSE", tenthPercent: "93.2", tenthYearPassing: "2023", collegeName: "DAV Senior School", twelfthBoard: "CBSE", twelfthPercent: "94.8", twelfthPhysics: "95", twelfthChemistry: "93", twelfthMaths: "98", yearPassing: "2025", tneaNo: "", department: "ece", admissionType: "management", hostelRequired: "no", transportRequired: "yes", status: "Pending", type: "admission", date: "2026-06-06" },
        ];
        await Enquiry.insertMany(admissionApps);
        console.log("✅ 12 realistic admission applications seeded (ready for admin review)");

        // ============================================================
        // 18. DEPARTMENTS
        // ============================================================
        await Department.insertMany([
            { icon: "💻", name: "Computer Science & Engineering", hod: "Dr. Karthikeyan V", facultyCount: "62 Faculty", studentCount: "1,200 Students", ugCourses: "8 UG", pgCourses: "4 PG", labCount: "15 Labs", accreditation: "NAAC A+ | NBA", color: "#3b82f6" },
            { icon: "📡", name: "Electronics & Communication", hod: "Dr. Anand Rajan", facultyCount: "48 Faculty", studentCount: "980 Students", ugCourses: "7 UG", pgCourses: "3 PG", labCount: "12 Labs", accreditation: "NAAC A+ | NBA", color: "#8b5cf6" },
            { icon: "⚙️", name: "Mechanical Engineering", hod: "Prof. Kumar Selvam", facultyCount: "42 Faculty", studentCount: "850 Students", ugCourses: "6 UG", pgCourses: "3 PG", labCount: "14 Labs", accreditation: "NAAC A | NBA", color: "#f59e0b" },
            { icon: "🏢", name: "Civil Engineering", hod: "Dr. Meena Thangaraj", facultyCount: "38 Faculty", studentCount: "720 Students", ugCourses: "6 UG", pgCourses: "2 PG", labCount: "10 Labs", accreditation: "NAAC A | NBA", color: "#10b981" },
            { icon: "🌐", name: "Information Technology", hod: "Dr. Deepa Srinivasan", facultyCount: "35 Faculty", studentCount: "650 Students", ugCourses: "6 UG", pgCourses: "2 PG", labCount: "11 Labs", accreditation: "NAAC A+ | NBA", color: "#06b6d4" },
            { icon: "🧬", name: "Biotechnology", hod: "Dr. Lakshmi Venkatesan", facultyCount: "28 Faculty", studentCount: "420 Students", ugCourses: "5 UG", pgCourses: "2 PG", labCount: "8 Labs", accreditation: "NAAC A Accredited", color: "#ec4899" }
        ]);
        console.log("✅ Departments seeded");

        // ============================================================
        // 19. COURSES
        // ============================================================
        await Course.insertMany([
            { code: "CS501", name: "Data Structures & Algorithms", dept: "CSE", sem: 5, credits: 4, type: "Core", faculty: "Dr. Ramesh Kumar", studentsCount: 245 },
            { code: "CS502", name: "Operating Systems", dept: "CSE", sem: 5, credits: 4, type: "Core", faculty: "Dr. Anand Mohan", studentsCount: 245 },
            { code: "CS503", name: "Database Management Systems", dept: "CSE", sem: 5, credits: 4, type: "Core", faculty: "Dr. Priya Nair", studentsCount: 245 },
            { code: "CS504", name: "Computer Networks", dept: "CSE", sem: 5, credits: 3, type: "Core", faculty: "Prof. Kumar Raj", studentsCount: 245 },
            { code: "CS506", name: "Artificial Intelligence", dept: "CSE", sem: 7, credits: 4, type: "Elective", faculty: "Dr. Ramesh Kumar", studentsCount: 182 },
            { code: "CS507", name: "Machine Learning", dept: "CSE", sem: 7, credits: 4, type: "Elective", faculty: "Dr. Deepa S", studentsCount: 195 },
            { code: "EC501", name: "VLSI Design", dept: "ECE", sem: 5, credits: 4, type: "Core", faculty: "Dr. Anand Rajan", studentsCount: 198 },
            { code: "EC502", name: "Digital Signal Processing", dept: "ECE", sem: 5, credits: 4, type: "Core", faculty: "Dr. Kavitha P", studentsCount: 198 },
            { code: "ME501", name: "Thermal Engineering", dept: "Mech", sem: 5, credits: 4, type: "Core", faculty: "Prof. Kumar Selvam", studentsCount: 175 },
            { code: "IT501", name: "Web Technologies", dept: "IT", sem: 5, credits: 3, type: "Core", faculty: "Dr. Priya Nair", studentsCount: 135 }
        ]);
        console.log("✅ Courses seeded");

        // ============================================================
        // 20. SUBJECTS
        // ============================================================
        await Subject.insertMany([
            { code: "CS501", name: "Data Structures", dept: "CSE", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Dr. Ramesh Kumar" },
            { code: "CS502", name: "Operating Systems", dept: "CSE", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Dr. Anand Mohan" },
            { code: "CS503", name: "DBMS", dept: "CSE", sem: 5, credits: 4, ltp: "3-0-1", faculty: "Dr. Priya Nair" },
            { code: "CS504", name: "Computer Networks", dept: "CSE", sem: 5, credits: 3, ltp: "3-0-0", faculty: "Prof. Kumar Raj" },
            { code: "CS505L", name: "DBMS Lab", dept: "CSE", sem: 5, credits: 1, ltp: "0-0-2", faculty: "Dr. Priya Nair" },
            { code: "EC501", name: "VLSI Design", dept: "ECE", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Dr. Anand Rajan" },
            { code: "EC502", name: "DSP", dept: "ECE", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Dr. Kavitha P" },
            { code: "ME501", name: "Thermal Engg", dept: "Mech", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Prof. Kumar S" },
            { code: "IT501", name: "Web Technologies", dept: "IT", sem: 5, credits: 3, ltp: "3-0-1", faculty: "Dr. Priya Nair" },
            { code: "BT501", name: "Genetic Engg", dept: "Biotech", sem: 5, credits: 4, ltp: "3-1-0", faculty: "Dr. Lakshmi V" }
        ]);
        console.log("✅ Subjects seeded");

        // ============================================================
        // 21. BOOKS
        // ============================================================
        await Book.insertMany([
            { bookId: "LIB-001", title: "Introduction to Algorithms", author: "Cormen et al", category: "CS", dept: "CSE", copies: 12, available: 8, status: "Available" },
            { bookId: "LIB-002", title: "Operating System Concepts", author: "Silberschatz", category: "CS", dept: "CSE", copies: 10, available: 10, status: "Available" },
            { bookId: "LIB-003", title: "DBMS by Ramakrishnan", author: "Ramakrishnan", category: "CS", dept: "CSE", copies: 8, available: 3, status: "Low Stock" },
            { bookId: "LIB-004", title: "VLSI Design", author: "Kamran Eshraghian", category: "Electronics", dept: "ECE", copies: 6, available: 6, status: "Available" },
            { bookId: "LIB-005", title: "Fluid Mechanics", author: "Cengel & Cimbala", category: "Mechanical", dept: "Mech", copies: 8, available: 5, status: "Available" },
            { bookId: "LIB-006", title: "Structural Analysis", author: "R.C. Hibbeler", category: "Civil", dept: "Civil", copies: 7, available: 7, status: "Available" },
            { bookId: "LIB-007", title: "Web Technologies", author: "Uttam Roy", category: "IT", dept: "IT", copies: 10, available: 2, status: "Low Stock" },
            { bookId: "LIB-008", title: "Biotechnology", author: "B.D. Singh", category: "Biology", dept: "Biotech", copies: 5, available: 0, status: "Out of Stock" }
        ]);
        console.log("✅ Books seeded");

        // ============================================================
        // 22. HOSTEL ALLOCATIONS
        // ============================================================
        await HostelAllocation.insertMany([
            { room: "A-112", student: "Arjun Ramesh", roll: "21CS001", block: "Boys A", date: "2026-01-10" },
            { room: "A-115", student: "Rahul Sharma", roll: "21EC001", block: "Boys A", date: "2026-01-10" },
            { room: "B-201", student: "Priya Lakshmi", roll: "21CS002", block: "Girls B", date: "2026-01-11" },
            { room: "B-210", student: "Divya Menon", roll: "21IT001", block: "Girls B", date: "2026-01-11" }
        ]);
        console.log("✅ Hostel Allocations seeded");

        // ============================================================
        // 23. TRANSPORT ROUTES
        // ============================================================
        await TransportRoute.insertMany([
            { busNo: "TN-01-AB-1234", route: "Route 1 - Kanchipuram", area: "Kanchipuram - Pennalur", stops: 8, driver: "Murugan K", contact: "9876500001", capacity: 60, students: 58, status: "Active" },
            { busNo: "TN-01-AB-5678", route: "Route 2 - Chennai Central", area: "Chennai Central - College", stops: 12, driver: "Rajesh M", contact: "9876500002", capacity: 65, students: 62, status: "Active" },
            { busNo: "TN-01-AB-9012", route: "Route 3 - Tambaram", area: "Tambaram - College", stops: 10, driver: "Suresh V", contact: "9876500003", capacity: 55, students: 50, status: "Active" },
            { busNo: "TN-01-AB-3456", route: "Route 4 - Chrompet", area: "Chrompet - College", stops: 9, driver: "Kumar P", contact: "9876500004", capacity: 60, students: 48, status: "Active" },
            { busNo: "TN-01-AB-7890", route: "Route 5 - Perambur", area: "Perambur - College", stops: 11, driver: "Ravi S", contact: "9876500005", capacity: 65, students: 61, status: "Active" },
            { busNo: "TN-01-AB-1122", route: "Route 6 - Guindy", area: "Guindy - College", stops: 7, driver: "Ganesh R", contact: "9876500006", capacity: 55, students: 0, status: "Maintenance" }
        ]);
        console.log("✅ Transport Routes seeded");

        // ============================================================
        // 24. CERTIFICATE REQUESTS
        // ============================================================
        await CertificateRequest.insertMany([
            { certId: "CERT-001", student: "Arjun Ramesh", roll: "21CS001", dept: "CSE", type: "Bonafide", purpose: "Bank Loan", date: "2026-06-01", status: "Pending" },
            { certId: "CERT-002", student: "Priya Lakshmi", roll: "21CS002", dept: "CSE", type: "Bonafide", purpose: "Passport Application", date: "2026-06-01", status: "Approved" },
            { certId: "CERT-003", student: "Rahul Sharma", roll: "21EC001", dept: "ECE", type: "Transfer Certificate", purpose: "Transferred to VIT", date: "2026-06-02", status: "Pending" },
            { certId: "CERT-004", student: "Sneha Patel", roll: "21ME001", dept: "Mech", type: "Course Completion", purpose: "Job Application", date: "2026-06-03", status: "Approved" },
            { certId: "CERT-005", student: "Karthik Raj", roll: "21CV001", dept: "Civil", type: "Bonafide", purpose: "Scholarship Application", date: "2026-06-03", status: "Approved" },
            { certId: "CERT-006", student: "Divya Menon", roll: "21IT001", dept: "IT", type: "Course Completion", purpose: "Higher Studies", date: "2026-06-04", status: "Pending" }
        ]);
        console.log("✅ Certificate Requests seeded");

        // ============================================================
        // 25. COMPLAINTS
        // ============================================================
        await Complaint.insertMany([
            { ticketId: "TKT-001", student: "Arjun Ramesh (21CS001)", title: "Lab computer not working in CS Lab 1", category: "Infrastructure", priority: "High", date: "2026-06-01", status: "Open" },
            { ticketId: "TKT-002", student: "Priya Lakshmi (21CS002)", title: "Fee receipt not generated after payment", category: "Finance", priority: "High", date: "2026-06-02", status: "In Progress" },
            { ticketId: "TKT-003", student: "Rahul Sharma (21EC001)", title: "Library book not available - VLSI Design", category: "Library", priority: "Medium", date: "2026-06-03", status: "Open" },
            { ticketId: "TKT-004", student: "Divya Menon (21IT001)", title: "Hostel Wi-Fi not working in Room B-201", category: "Hostel", priority: "Medium", date: "2026-06-03", status: "In Progress" },
            { ticketId: "TKT-005", student: "Karthik Raj (21CV001)", title: "Internal marks not updated for CN subject", category: "Academic", priority: "High", date: "2026-06-04", status: "Resolved" }
        ]);
        console.log("✅ Complaints seeded");

        // ============================================================
        // FINAL SUMMARY
        // ============================================================
        console.log("\n🎉 SEEDING COMPLETE!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📊 DATABASE SUMMARY:");
        console.log("   Students      : 15 (+ 1 demo) with UNIQUE data");
        console.log("   Faculty       : 8 unique faculty members");
        console.log("   Admissions    : 12 public applicants (for admin review)");
        console.log("   Notices       : 5");
        console.log("   Events        : 4");
        console.log("   Assignments   : 5 (+ mapped to students)");
        console.log("   Exam Schedules: 10 (CSE, ECE, IT)");
        console.log("   Notifications : 17 (unique per student)");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔑 LOGIN CREDENTIALS:");
        console.log("   Student  : roll=student     | password=student123");
        console.log("   Student  : roll=21CS001     | password=student123");
        console.log("   Student  : roll=21CS002     | password=student123");
        console.log("   Faculty  : empId=faculty    | password=faculty123");
        console.log("   Faculty  : empId=FAC-CSE-001| password=faculty123");
        console.log("   Admin    : username=admin   | password=admin123");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
