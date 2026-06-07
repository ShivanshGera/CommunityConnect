const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createIssue,
  getMyIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

router.post(
  "/create",
  authMiddleware,
  createIssue
);

router.get("/my",authMiddleware,getMyIssues);
router.get("/:id",authMiddleware,getIssueById);
router.put("/:id",authMiddleware,updateIssue);
router.delete("/:id",authMiddleware,deleteIssue);

module.exports = router;