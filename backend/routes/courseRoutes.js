const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const protect = require('../middleware/authMiddleware'); // ✅ Default export, keep as-is
const upload = require('../middleware/uploadMiddleware');

// ✅ NEW: Get courses grouped by status (pending, current, completed)
router.get('/grouped', protect, courseController.getGroupedCourses);

// Create a new course with thumbnail
router.post(
  '/',
  protect,
  upload.single('thumbnail'),
  courseController.createCourse
);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Delete a course
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;
