const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  isAdmin,
} = require("../middleware/roleMiddleware");

const {
  getAllIssues,
  updateIssueStatus
} = require("../controllers/adminController");

router.get(
  "/issues",
  authMiddleware,
  isAdmin,
  getAllIssues
);

router.patch("/issues/:id/status",authMiddleware,isAdmin,updateIssueStatus);

module.exports = router;