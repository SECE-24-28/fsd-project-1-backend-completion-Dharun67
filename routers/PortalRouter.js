const express = require("express");
const router = express.Router();
const controller = require("../controllers/PortalController");

// ==========================================
// SESSION VERIFICATION MIDDLEWARE
// ==========================================
// Checks that the request has a valid server-side session stored in MongoDB.
// No JWT, no Authorization header — the browser sends the session cookie automatically.
const verifySession = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ success: false, message: "Not authenticated. Please log in." });
};

// ==========================================
// 1. AUTHENTICATION
// ==========================================
router.post("/auth/login", controller.loginUser);
router.get("/auth/me", controller.getSessionUser);       // Returns current logged-in user from session
router.post("/auth/logout", controller.logoutUser);      // Destroys session in MongoDB

// ==========================================
// 2. STUDENT PORTAL ENDPOINTS
// ==========================================
router.get("/student/attendance/:rollNo", verifySession, controller.getStudentAttendance);
router.get("/student/marks/:rollNo", verifySession, controller.getStudentMarks);
router.get("/student/fees/:rollNo", verifySession, controller.getStudentFees);
router.post("/student/fees/:rollNo/pay", verifySession, controller.makeFeePayment);
router.get("/student/timetable", verifySession, controller.getTimetable);
router.get("/student/assignments/:rollNo", verifySession, controller.getStudentAssignments);
router.post("/student/assignments/:rollNo/:assignmentId/submit", verifySession, controller.submitStudentAssignment);
router.get("/student/hall-ticket/:rollNo", verifySession, controller.getStudentHallTicket);
router.get("/student/leaves/:rollNo", verifySession, controller.getStudentLeaves);
router.post("/student/leaves/:rollNo", verifySession, controller.applyStudentLeave);
router.get("/student/notifications/:rollNo", verifySession, controller.getStudentNotifications);
router.post("/student/notifications/:rollNo/read", verifySession, controller.markStudentNotificationsRead);
router.get("/student/results/:rollNo", verifySession, controller.getStudentResults);
router.put("/student/photo/:rollNo", verifySession, controller.uploadStudentPhoto);
router.post("/student/complaints", verifySession, controller.createStudentComplaint);
router.get("/student/complaints/:rollNo", verifySession, controller.getStudentComplaints);
router.post("/student/certificates", verifySession, controller.createCertificateRequest);
router.get("/student/certificates/:rollNo", verifySession, controller.getStudentCertificates);

// ==========================================
// 3. FACULTY PORTAL ENDPOINTS
// ==========================================
router.get("/faculty/profile/:empId", verifySession, controller.getFacultyProfile);
router.put("/faculty/profile/:empId", verifySession, controller.updateFacultyProfile);
router.get("/faculty/students", verifySession, controller.getFacultyStudents);
router.post("/faculty/attendance", verifySession, controller.saveClassAttendance);
router.post("/faculty/marks", verifySession, controller.saveStudentMarks);
router.get("/faculty/assignments", verifySession, controller.getFacultyAssignments);
router.post("/faculty/assignments", verifySession, controller.uploadFacultyAssignment);
router.get("/faculty/assignments/:assignmentId/submissions", verifySession, controller.getAssignmentSubmissions);
router.delete("/faculty/assignments/:id", verifySession, controller.deleteFacultyAssignment);
router.get("/faculty/leaves", verifySession, controller.getFacultyLeaveRequests);
router.post("/faculty/leaves/:id/action", verifySession, controller.actionLeaveRequest);
router.post("/faculty/message", verifySession, controller.sendFacultyNotification);
router.put("/faculty/photo/:empId", verifySession, controller.uploadFacultyPhoto);

// ==========================================
// 4. ADMIN PORTAL ENDPOINTS
// ==========================================
router.get("/admin/students", verifySession, controller.getAdminStudents);
router.post("/admin/students", verifySession, controller.addAdminStudent);
router.put("/admin/students/:id", verifySession, controller.updateAdminStudent);
router.delete("/admin/students/:id", verifySession, controller.deleteAdminStudent);

router.get("/admin/faculty", verifySession, controller.getAdminFaculty);
router.post("/admin/faculty", verifySession, controller.addAdminFaculty);
router.put("/admin/faculty/:id", verifySession, controller.updateAdminFaculty);
router.delete("/admin/faculty/:id", verifySession, controller.deleteAdminFaculty);

router.get("/admin/notices", verifySession, controller.getAdminNotices);
router.post("/admin/notices", verifySession, controller.addAdminNotice);
router.delete("/admin/notices/:id", verifySession, controller.deleteAdminNotice);

router.get("/admin/events", verifySession, controller.getAdminEvents);
router.post("/admin/events", verifySession, controller.addAdminEvent);
router.delete("/admin/events/:id", verifySession, controller.deleteAdminEvent);

router.get("/admin/placements", verifySession, controller.getWebsitePlacements);
router.post("/admin/placements", verifySession, controller.saveWebsitePlacements);

router.get("/admin/settings", verifySession, controller.getWebsiteSettings);
router.post("/admin/settings", verifySession, controller.saveWebsiteSettings);

router.get("/admin/activity-logs", verifySession, controller.getAdminActivityLogs);
router.get("/admin/enquiries", verifySession, controller.getAdmissionsEnquiries);
router.patch("/admin/admissions/:id/status", verifySession, controller.updateAdmissionStatus);

// Dynamic Admin Section Endpoints
router.get("/admin/departments", verifySession, controller.getAdminDepartments);
router.get("/admin/courses", verifySession, controller.getAdminCourses);
router.get("/admin/subjects", verifySession, controller.getAdminSubjects);
router.get("/admin/library/books", verifySession, controller.getAdminBooks);
router.get("/admin/hostel/allocations", verifySession, controller.getAdminHostelAllocations);
router.get("/admin/transport/routes", verifySession, controller.getAdminTransportRoutes);
router.get("/admin/certificates", verifySession, controller.getAdminCertificateRequests);
router.patch("/admin/certificates/:id/action", verifySession, controller.updateCertificateStatus);
router.get("/admin/complaints", verifySession, controller.getAdminComplaints);
router.patch("/admin/complaints/:id/resolve", verifySession, controller.resolveComplaint);
router.get("/admin/fees/all", verifySession, controller.getAdminAllFees);

// ==========================================
// 5. PUBLIC WEB PORTAL ENDPOINTS
// ==========================================
router.post("/public/enquiry", controller.submitAdmissionsEnquiry);

module.exports = router;

