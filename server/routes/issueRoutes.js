const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createIssue,
  getMyIssues,
} = require("../controllers/issueController");

router.post(
  "/create",
  authMiddleware,
  createIssue
);

router.get("/my",authMiddleware,getMyIssues);

module.exports = router;