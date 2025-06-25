// routes/progress.js
const express = require('express');
const router = express.Router();
const {
  getUserCourseProgress,
  markItemComplete
} = require('../controllers/progressController');

// GET user progress
router.get('/:courseId', getUserCourseProgress);

// PATCH mark completion
router.patch('/mark-complete', markItemComplete);

module.exports = router;
