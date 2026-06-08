const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  isAdmin,
} = require("../middleware/roleMiddleware");

const {
  getAllIssues,
  updateIssueStatus,
  getDashboardStats,
  deleteIssueByAdmin
} = require("../controllers/adminController");

router.get(
  "/issues",
  authMiddleware,
  isAdmin,
  getAllIssues
);

router.patch("/issues/:id/status",authMiddleware,isAdmin,updateIssueStatus);
router.get("/dashboard",authMiddleware,isAdmin,getDashboardStats);
router.delete("/issues/:id",authMiddleware,isAdmin,deleteIssueByAdmin);

module.exports = router;