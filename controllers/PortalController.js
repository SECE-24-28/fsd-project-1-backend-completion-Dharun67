const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const Assignment = require("../models/Assignment");
const StudentAssignment = require("../models/StudentAssignment");
const LeaveApplication = require("../models/LeaveApplication");
const Attendance = require("../models/Attendance");
const Mark = require("../models/Mark");
const Fee = require("../models/Fee");
const Timetable = require("../models/Timetable");
const Enquiry = require("../models/Enquiry");
const Notification = require("../models/Notification");
const Result = require("../models/Result");
const WebsiteSetting = require("../models/WebsiteSetting");
const ActivityLog = require("../models/ActivityLog");
const ExamSchedule = require("../models/ExamSchedule");
const Department = require("../models/Department");
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const Book = require("../models/Book");
const HostelAllocation = require("../models/HostelAllocation");
const TransportRoute = require("../models/TransportRoute");
const CertificateRequest = require("../models/CertificateRequest");
const Complaint = require("../models/Complaint");
// ==========================================
// 1. AUTHENTICATION CONTROLLERS
// ==========================================

/**
 * POST /auth/login
 * Validates credentials against MongoDB, then stores the user in req.session.user.
 * The session is persisted in MongoDB (bec_portal_db → sessions collection).
 * No JWT token is issued — the browser handles the session cookie automatically.
 */
const loginUser = async (req, res) => {
    try {
        const { type, id, password } = req.body;
        if (!type || !id || !password) {
            return res.status(400).json({ success: false, message: "Type, ID, and password are required" });
        }

        let user = null;

        if (type === "student") {
            user = await Student.findOne({
                $or: [{ roll: id }, { email: id }],
                password: password
            });
        } else if (type === "faculty") {
            user = await Faculty.findOne({
                $or: [{ empId: id }, { email: id }],
                password: password
            });
        } else if (type === "admin") {
            user = await Admin.findOne({
                username: id,
                password: password
            });
        }

        if (user) {
            // Save user info into the MongoDB-backed session (no JWT)
            req.session.user = {
                _id: user._id,
                type,
                identity: type === 'admin' ? user.username : (type === 'student' ? user.roll : user.empId),
                name: user.name,
                email: user.email
            };
            // Return the full user object so the frontend can use it directly
            return res.status(200).json({ success: true, type, user });
        } else {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * GET /auth/me
 * Returns the currently logged-in user from the MongoDB session.
 * The frontend calls this on app load to restore the session without localStorage.
 */
const getSessionUser = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ success: false, message: "No active session" });
        }

        const { type, identity } = req.session.user;
        let user = null;

        // Fetch fresh user data from MongoDB using the session identity
        if (type === "student") {
            user = await Student.findOne({ roll: identity });
        } else if (type === "faculty") {
            user = await Faculty.findOne({ empId: identity });
        } else if (type === "admin") {
            user = await Admin.findOne({ username: identity });
        }

        if (!user) {
            // Session exists but user was deleted from DB — destroy it
            req.session.destroy();
            return res.status(401).json({ success: false, message: "Session user not found in database" });
        }

        return res.status(200).json({ success: true, type, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * POST /auth/logout
 * Destroys the session in MongoDB, clearing the user's login state completely.
 */
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.clearCookie("connect.sid");  // Clear the session cookie from the browser
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    });
};

// ==========================================
// 2. STUDENT PORTAL CONTROLLERS
// ==========================================
const getStudentAttendance = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const attendance = await Attendance.findOne({ rollNo });
        return res.status(200).json(attendance || { rollNo, overall: 80, subjects: [] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentMarks = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const marks = await Mark.findOne({ rollNo });
        return res.status(200).json(marks || { rollNo, subjects: [] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentFees = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const fees = await Fee.findOne({ rollNo });
        return res.status(200).json(fees || { rollNo, total: 0, paid: 0, due: 0, history: [] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const makeFeePayment = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const { amount, description } = req.body;
        
        let fees = await Fee.findOne({ rollNo });
        if (!fees) {
            fees = new Fee({ rollNo, total: 50000, paid: 0, due: 50000, history: [] });
        }

        const actualPaid = Math.min(amount, fees.due);
        fees.due = Math.max(0, fees.due - actualPaid);
        fees.paid += actualPaid;
        
        const receiptItem = {
            receipt: `REC-${new Date().getFullYear()}-ONLINE-${Math.floor(100 + Math.random() * 900)}`,
            description: description || "Online Tuition Fee Payment",
            amount: actualPaid,
            date: new Date().toISOString().split("T")[0],
            status: "Paid"
        };
        fees.history.unshift(receiptItem);
        await fees.save();

        // Add an activity log
        await new ActivityLog({
            user: rollNo,
            action: "Paid Fees Online",
            details: `Amount: ₹${actualPaid}, Receipt: ${receiptItem.receipt}`
        }).save();

        return res.status(200).json(fees);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTimetable = async (req, res) => {
    try {
        const { dept, sem } = req.query;
        const semNum = parseInt(sem);
        const timetable = await Timetable.findOne({ dept, sem: semNum });
        return res.status(200).json(timetable ? timetable.slots : []);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentAssignments = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const assignments = await StudentAssignment.find({ rollNo }).sort({ createdAt: -1 });
        return res.status(200).json(assignments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const submitStudentAssignment = async (req, res) => {
    try {
        const { rollNo, assignmentId } = req.params;
        const { submittedFile } = req.body;
        const assignment = await StudentAssignment.findOneAndUpdate(
            { rollNo, _id: assignmentId },
            { 
                status: "submitted",
                submittedFile: {
                    ...submittedFile,
                    submittedAt: new Date()
                }
            },
            { new: true }
        );
        
        if (assignment && assignment.assignmentId) {
            // Increment submission count in parent Assignment
            await Assignment.findByIdAndUpdate(assignment.assignmentId, { $inc: { submissions: 1 } });
        }

        return res.status(200).json({ success: true, assignment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentHallTicket = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const student = await Student.findOne({ roll: rollNo });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        const schedules = await ExamSchedule.find({ dept: student.dept, sem: student.sem }).sort({ examDate: 1 });
        return res.status(200).json({
            success: true,
            student: {
                name: student.name,
                roll: student.roll,
                dept: student.dept,
                sem: student.sem
            },
            schedules
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAssignmentSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const submissions = await StudentAssignment.find({ assignmentId, status: "submitted" }).lean();
        const rolls = submissions.map(s => s.rollNo);
        const students = await Student.find({ roll: { $in: rolls } }, "roll name dept");
        const studentMap = {};
        students.forEach(s => {
            studentMap[s.roll] = s.name;
        });
        const populatedSubmissions = submissions.map(s => ({
            ...s,
            studentName: studentMap[s.rollNo] || "Unknown Student"
        }));
        return res.status(200).json(populatedSubmissions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentLeaves = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const leaves = await LeaveApplication.find({ roll: rollNo }).sort({ createdAt: -1 });
        return res.status(200).json(leaves);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const applyStudentLeave = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const { type, from, to, reason, name } = req.body;
        const newLeave = new LeaveApplication({
            roll: rollNo,
            name,
            type,
            from,
            to,
            reason,
            status: "Pending"
        });
        const saved = await newLeave.save();

        // Admin log
        await new ActivityLog({
            user: rollNo,
            action: "Applied for Leave",
            details: `Type: ${type}, From: ${from} To: ${to}`
        }).save();

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentNotifications = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const notifications = await Notification.find({ rollNo }).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const markStudentNotificationsRead = async (req, res) => {
    try {
        const { rollNo } = req.params;
        await Notification.updateMany({ rollNo }, { isNew: false });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentResults = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const result = await Result.findOne({ rollNo });
        return res.status(200).json(result || null);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ==========================================
// 3. FACULTY PORTAL CONTROLLERS
// ==========================================
const getFacultyProfile = async (req, res) => {
    try {
        const { empId } = req.params;
        const faculty = await Faculty.findOne({ empId });
        return res.status(200).json(faculty);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateFacultyProfile = async (req, res) => {
    try {
        const { empId } = req.params;
        const updatedFaculty = await Faculty.findOneAndUpdate({ empId }, req.body, { new: true });
        return res.status(200).json(updatedFaculty);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getFacultyStudents = async (req, res) => {
    try {
        const { dept } = req.query;
        const filter = dept ? { dept } : {};
        const students = await Student.find(filter).sort({ roll: 1 });
        
        const mapped = [];
        for (let i = 0; i < students.length; i++) {
            const s = students[i];
            const attRecord = await Attendance.findOne({ rollNo: s.roll });
            const markRecord = await Mark.findOne({ rollNo: s.roll });
            
            const studentCls = `${s.roll.slice(0, 4)}-${i % 2 === 0 ? 'A' : 'B'}`;
            const attVal = attRecord ? attRecord.overall : 80;
            
            let iaVal = 20;
            let ia2Val = 18;
            let assignVal = 8;
            if (markRecord && markRecord.subjects) {
                const dsMark = markRecord.subjects.find(sub => sub.name === "Data Structures");
                if (dsMark) {
                    iaVal = dsMark.ia1 ?? iaVal;
                    ia2Val = dsMark.ia2 ?? ia2Val;
                    assignVal = dsMark.assignment ?? assignVal;
                }
            }
            
            mapped.push({
                roll: s.roll,
                name: s.name,
                cls: studentCls,
                att: attVal,
                ia: iaVal,
                ia2: ia2Val,
                assignment: assignVal,
                status: attVal < 75 ? "Low Att." : "Active",
                dept: s.dept,
                email: s.email,
                phone: s.phone,
                id: s._id
            });
        }
        return res.status(200).json(mapped);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const saveClassAttendance = async (req, res) => {
    try {
        const { attCourse, attDate, attData } = req.body;
        // attData is array of { roll, present, cls, name }
        // Course name resolution
        const subjectName = attCourse.split("/")[0].trim();

        for (const item of attData) {
            let record = await Attendance.findOne({ rollNo: item.roll });
            if (!record) {
                record = new Attendance({ rollNo: item.roll, overall: 100, subjects: [] });
            }

            let subRecord = record.subjects.find(s => s.name === subjectName);
            if (!subRecord) {
                subRecord = { name: subjectName, total: 0, present: 0, absent: 0 };
                record.subjects.push(subRecord);
            }

            subRecord.total += 1;
            if (item.present) {
                subRecord.present += 1;
            } else {
                subRecord.absent += 1;
            }

            // Recalculate overall
            const totalLectures = record.subjects.reduce((sum, s) => sum + s.total, 0);
            const totalPresent = record.subjects.reduce((sum, s) => sum + s.present, 0);
            record.overall = totalLectures > 0 ? Math.round((totalPresent / totalLectures) * 100) : 100;

            await record.save();
        }

        return res.status(200).json({ success: true, message: "Attendance saved successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const saveStudentMarks = async (req, res) => {
    try {
        const { marksCourse, marksData } = req.body;
        // marksData is array of { roll, ia1, ia2, assignment }
        const subjectName = marksCourse.split("/")[0].trim();

        for (const item of marksData) {
            let record = await Mark.findOne({ rollNo: item.roll });
            if (!record) {
                record = new Mark({ rollNo: item.roll, subjects: [] });
            }

            let subRecord = record.subjects.find(s => s.name === subjectName);
            if (!subRecord) {
                subRecord = { name: subjectName, ia1: 0, ia2: 0, assignment: 0, total: 0 };
                record.subjects.push(subRecord);
            }

            subRecord.ia1 = item.ia1;
            subRecord.ia2 = item.ia2;
            subRecord.assignment = item.assignment;
            subRecord.total = item.ia1 + item.ia2 + item.assignment;

            await record.save();
        }

        return res.status(200).json({ success: true, message: "Marks saved successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getFacultyAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ createdAt: -1 });
        return res.status(200).json(assignments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const uploadFacultyAssignment = async (req, res) => {
    try {
        const { title, course, desc, due, maxMarks, facultyName } = req.body;
        const newA = new Assignment({
            title,
            course,
            desc,
            due,
            maxMarks,
            faculty: facultyName,
            status: "Active",
            submissions: 0
        });
        const saved = await newA.save();

        // Distribute to StudentAssignment for ALL students in the department
        // Course e.g. "CS3351 / 21CS-A", resolving subject to "Data Structures"
        const subject = course.split("/")[0].trim();
        const students = await Student.find(); // Or filter by course branch
        
        const studentAssignments = students.map(student => ({
            rollNo: student.roll,
            assignmentId: saved._id,
            title,
            subject,
            faculty: facultyName,
            due,
            status: "pending"
        }));

        await StudentAssignment.insertMany(studentAssignments);

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteFacultyAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        await Assignment.findByIdAndDelete(id);
        await StudentAssignment.deleteMany({ assignmentId: id });
        return res.status(200).json({ success: true, message: "Assignment deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getFacultyLeaveRequests = async (req, res) => {
    try {
        const leaves = await LeaveApplication.find().sort({ createdAt: -1 });
        return res.status(200).json(leaves);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const actionLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // Approved or Rejected
        
        const updated = await LeaveApplication.findByIdAndUpdate(id, { status: action }, { new: true });
        
        if (updated) {
            // Update Student Status if approved
            if (action === "Approved") {
                await Student.findOneAndUpdate({ roll: updated.roll }, { status: "On Leave" });
            } else {
                await Student.findOneAndUpdate({ roll: updated.roll }, { status: "Active" });
            }
        }

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const sendFacultyNotification = async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        const students = await Student.find();
        
        const notificationsToInsert = [];
        students.forEach(s => {
            let matches = false;
            if (to === "All My Students") {
                matches = true;
            } else if (to === "21CS-A Students" && s.roll.startsWith("21CS")) {
                matches = s.dept === "CSE";
            } else if (to === "21CS-B Students" && s.dept === "CSE") {
                matches = true;
            } else if (to === "CS3351 Enrolled" && s.dept === "CSE") {
                matches = true;
            }
            
            if (matches) {
                notificationsToInsert.push({
                    rollNo: s.roll,
                    icon: "📢",
                    title: subject,
                    message: message,
                    time: new Date().toLocaleString(),
                    isNew: true
                });
            }
        });

        if (notificationsToInsert.length > 0) {
            await Notification.insertMany(notificationsToInsert);
        }

        return res.status(200).json({ success: true, message: `Notification sent to ${notificationsToInsert.length} students` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ==========================================
// 4. ADMIN PORTAL CONTROLLERS
// ==========================================
const getAdminStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ roll: 1 });
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addAdminStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = new Student(studentData);
        const saved = await newStudent.save();

        // Initialize empty records for the student
        await new Attendance({ rollNo: saved.roll, overall: 100, subjects: [] }).save();
        await new Mark({ rollNo: saved.roll, subjects: [] }).save();
        await new Fee({
            rollNo: saved.roll,
            total: 57500,
            paid: 0,
            due: 57500,
            history: []
        }).save();
        await new Result({
            rollNo: saved.roll,
            sem3: { gpa: 0, result: "Pending", arrears: 0, subjects: [] },
            sem4: { gpa: 0, result: "Pending", arrears: 0, subjects: [] }
        }).save();

        // Log action
        await new ActivityLog({
            user: "admin",
            action: "Added new student",
            details: `Name: ${saved.name}, Roll: ${saved.roll}`
        }).save();

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateAdminStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
        
        await new ActivityLog({
            user: "admin",
            action: "Updated student",
            details: `Roll: ${updated.roll}`
        }).save();

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteAdminStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Student.findByIdAndDelete(id);
        if (deleted) {
            await Attendance.deleteOne({ rollNo: deleted.roll });
            await Mark.deleteOne({ rollNo: deleted.roll });
            await Fee.deleteOne({ rollNo: deleted.roll });
            await Result.deleteOne({ rollNo: deleted.roll });
            await StudentAssignment.deleteMany({ rollNo: deleted.roll });
            await Notification.deleteMany({ rollNo: deleted.roll });

            await new ActivityLog({
                user: "admin",
                action: "Deleted student",
                details: `Roll: ${deleted.roll}`
            }).save();
        }
        return res.status(200).json({ success: true, message: "Student deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAdminFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find().sort({ empId: 1 });
        return res.status(200).json(faculty);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addAdminFaculty = async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const saved = await newFaculty.save();
        
        await new ActivityLog({
            user: "admin",
            action: "Added new faculty",
            details: `Name: ${saved.name}, EmpId: ${saved.empId}`
        }).save();

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateAdminFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Faculty.findByIdAndUpdate(id, req.body, { new: true });
        
        await new ActivityLog({
            user: "admin",
            action: "Updated faculty",
            details: `EmpId: ${updated.empId}`
        }).save();

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteAdminFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Faculty.findByIdAndDelete(id);
        if (deleted) {
            await new ActivityLog({
                user: "admin",
                action: "Deleted faculty",
                details: `EmpId: ${deleted.empId}`
            }).save();
        }
        return res.status(200).json({ success: true, message: "Faculty deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Notices CRUD
const getAdminNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ pinned: -1, createdAt: -1 });
        return res.status(200).json(notices);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addAdminNotice = async (req, res) => {
    try {
        const newNotice = new Notice(req.body);
        const saved = await newNotice.save();
        
        await new ActivityLog({
            user: "admin",
            action: "Created notice",
            details: `Title: ${saved.title}`
        }).save();

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteAdminNotice = async (req, res) => {
    try {
        const { id } = req.params;
        await Notice.findByIdAndDelete(id);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Events CRUD
const getAdminEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addAdminEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const saved = await newEvent.save();
        
        await new ActivityLog({
            user: "admin",
            action: "Created event",
            details: `Title: ${saved.title}`
        }).save();

        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteAdminEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Placements
const getWebsitePlacements = async (req, res) => {
    try {
        const settings = await WebsiteSetting.findOne({ key: "site_settings" });
        return res.status(200).json(settings ? settings.placements : null);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const saveWebsitePlacements = async (req, res) => {
    try {
        const { placements } = req.body;
        const updated = await WebsiteSetting.findOneAndUpdate(
            { key: "site_settings" },
            { placements },
            { new: true }
        );
        return res.status(200).json(updated.placements);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Settings
const getWebsiteSettings = async (req, res) => {
    try {
        const settings = await WebsiteSetting.findOne({ key: "site_settings" });
        return res.status(200).json(settings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const saveWebsiteSettings = async (req, res) => {
    try {
        const settingsData = req.body;
        const updated = await WebsiteSetting.findOneAndUpdate(
            { key: "site_settings" },
            settingsData,
            { new: true, upsert: true }
        );
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Logs
const getAdminActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100);
        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Admissions Enquiries CRUD
const getAdmissionsEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        return res.status(200).json(enquiries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const submitAdmissionsEnquiry = async (req, res) => {
    try {
        const data = req.body;
        // Auto-generate a unique Application ID
        const appId = `APP-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
        const newEnquiry = new Enquiry({
            ...data,
            appId,
            type: data.subject ? 'contact' : 'admission',
            status: 'Pending',
        });
        const saved = await newEnquiry.save();

        // Log to activity log
        await new ActivityLog({
            user: data.name || 'Public Applicant',
            action: 'Submitted Admission Application',
            details: `App ID: ${appId} | Dept: ${data.department || 'N/A'} | Email: ${data.email}`
        }).save();

        return res.status(201).json({ success: true, appId, enquiry: saved });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update Admission Status (Admin action)
const updateAdmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reviewNotes, reviewedBy } = req.body;
        const updated = await Enquiry.findByIdAndUpdate(id, {
            status,
            reviewNotes: reviewNotes || '',
            reviewedBy: reviewedBy || 'Admin',
            reviewedAt: new Date(),
            replied: status === 'Approved' || status === 'Rejected'
        }, { new: true });

        await new ActivityLog({
            user: reviewedBy || 'Admin',
            action: `Admission ${status}`,
            details: `App: ${updated.appId} | Applicant: ${updated.name} | Notes: ${reviewNotes || 'None'}`
        }).save();

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Upload Profile Photo (Student)
const uploadStudentPhoto = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const { profilePhoto } = req.body; // base64 data URL
        if (!profilePhoto) return res.status(400).json({ success: false, message: 'No photo provided' });
        const updated = await Student.findOneAndUpdate({ roll: rollNo }, { profilePhoto }, { new: true });
        return res.status(200).json({ success: true, profilePhoto: updated.profilePhoto });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Upload Profile Photo (Faculty)
const uploadFacultyPhoto = async (req, res) => {
    try {
        const { empId } = req.params;
        const { profilePhoto } = req.body; // base64 data URL
        if (!profilePhoto) return res.status(400).json({ success: false, message: 'No photo provided' });
        const updated = await Faculty.findOneAndUpdate({ empId }, { profilePhoto }, { new: true });
        return res.status(200).json({ success: true, profilePhoto: updated.profilePhoto });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Departments
const getAdminDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ name: 1 });
        return res.status(200).json(departments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Courses
const getAdminCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ code: 1 });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Subjects
const getAdminSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ code: 1 });
        return res.status(200).json(subjects);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Books
const getAdminBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ bookId: 1 });
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Hostel Allocations
const getAdminHostelAllocations = async (req, res) => {
    try {
        const allocations = await HostelAllocation.find().sort({ room: 1 });
        return res.status(200).json(allocations);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Transport Routes
const getAdminTransportRoutes = async (req, res) => {
    try {
        const routes = await TransportRoute.find().sort({ busNo: 1 });
        return res.status(200).json(routes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Certificate Requests
const getAdminCertificateRequests = async (req, res) => {
    try {
        const requests = await CertificateRequest.find().sort({ createdAt: -1 });
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCertificateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await CertificateRequest.findByIdAndUpdate(id, { status }, { new: true });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Complaints
const getAdminComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        return res.status(200).json(complaints);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const resolveComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Complaint.findByIdAndUpdate(id, { status: "Resolved" }, { new: true });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// All Fees (joining Fee data with Student name/dept/sem)
const getAdminAllFees = async (req, res) => {
    try {
        const fees = await Fee.find().lean();
        const rolls = fees.map(f => f.rollNo);
        const students = await Student.find({ roll: { $in: rolls } }, "roll name dept sem").lean();
        
        const studentMap = {};
        students.forEach(s => {
            studentMap[s.roll] = { name: s.name, dept: s.dept, sem: s.sem };
        });
        
        const mergedFees = fees.map(f => {
            const stuInfo = studentMap[f.rollNo] || { name: "Unknown Student", dept: "N/A", sem: 1 };
            return {
                ...f,
                name: stuInfo.name,
                dept: stuInfo.dept,
                sem: stuInfo.sem
            };
        });
        
        return res.status(200).json(mergedFees);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Student Complaints Creation & Fetching
const createStudentComplaint = async (req, res) => {
    try {
        const { student, title, category, priority } = req.body;
        if (!student || !title || !category) {
            return res.status(400).json({ success: false, message: "Missing required complaint fields" });
        }
        const ticketId = `TKT-${Math.floor(100 + Math.random() * 900)}`;
        const complaint = new Complaint({
            ticketId,
            student,
            title,
            category,
            priority: priority || "Medium",
            status: "Open"
        });
        await complaint.save();
        return res.status(201).json(complaint);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentComplaints = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const complaints = await Complaint.find({
            $or: [
                { student: rollNo },
                { student: new RegExp(rollNo, "i") }
            ]
        }).sort({ createdAt: -1 });
        return res.status(200).json(complaints);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Student Certificate Requests Creation & Fetching
const createCertificateRequest = async (req, res) => {
    try {
        const { studentName, rollNo, dept, type, purpose } = req.body;
        if (!studentName || !rollNo || !dept || !type || !purpose) {
            return res.status(400).json({ success: false, message: "Missing required certificate request fields" });
        }
        const certId = `CERT-${Math.floor(100 + Math.random() * 900)}`;
        const request = new CertificateRequest({
            certId,
            student: studentName,
            roll: rollNo,
            dept,
            type,
            purpose,
            date: new Date().toISOString().split("T")[0],
            status: "Pending"
        });
        await request.save();
        return res.status(201).json(request);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getStudentCertificates = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const requests = await CertificateRequest.find({ roll: rollNo }).sort({ createdAt: -1 });
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    getStudentAttendance,
    getStudentMarks,
    getStudentFees,
    makeFeePayment,
    getTimetable,
    getStudentAssignments,
    submitStudentAssignment,
    getStudentHallTicket,
    getAssignmentSubmissions,
    getStudentLeaves,
    applyStudentLeave,
    getStudentNotifications,
    markStudentNotificationsRead,
    getStudentResults,
    getFacultyProfile,
    updateFacultyProfile,
    getFacultyStudents,
    saveClassAttendance,
    saveStudentMarks,
    getFacultyAssignments,
    uploadFacultyAssignment,
    deleteFacultyAssignment,
    getFacultyLeaveRequests,
    actionLeaveRequest,
    sendFacultyNotification,
    getAdminStudents,
    addAdminStudent,
    updateAdminStudent,
    deleteAdminStudent,
    getAdminFaculty,
    addAdminFaculty,
    updateAdminFaculty,
    deleteAdminFaculty,
    getAdminNotices,
    addAdminNotice,
    deleteAdminNotice,
    getAdminEvents,
    addAdminEvent,
    deleteAdminEvent,
    getWebsitePlacements,
    saveWebsitePlacements,
    getWebsiteSettings,
    saveWebsiteSettings,
    getAdminActivityLogs,
    getAdmissionsEnquiries,
    submitAdmissionsEnquiry,
    updateAdmissionStatus,
    uploadStudentPhoto,
    uploadFacultyPhoto,
    getSessionUser,
    logoutUser,
    getAdminDepartments,
    getAdminCourses,
    getAdminSubjects,
    getAdminBooks,
    getAdminHostelAllocations,
    getAdminTransportRoutes,
    getAdminCertificateRequests,
    updateCertificateStatus,
    getAdminComplaints,
    resolveComplaint,
    getAdminAllFees,
    createStudentComplaint,
    getStudentComplaints,
    createCertificateRequest,
    getStudentCertificates,
};
