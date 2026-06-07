const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createIssue,
} = require("../controllers/issueController");

router.post(
  "/create",
  authMiddleware,
  createIssue
);

module.exports = router;