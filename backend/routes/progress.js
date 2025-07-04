// routes/progress.js
const express = require('express');
const router = express.Router();
const {
  getUserCourseProgress,
  markItemComplete,
  getUserDashboardProgress
} = require('../controllers/progressController');

const authMiddleware = require('../middleware/authMiddleware');

// GET user progress for a specific course
router.get('/:courseId', getUserCourseProgress);

// PATCH mark any course item as complete
router.patch('/mark-complete', markItemComplete);

// ✅ NEW: GET progress for all user courses (dashboard)
router.get('/dashboard', authMiddleware, getUserDashboardProgress);

module.exports = router;