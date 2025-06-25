const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const protect = require('../middleware/authMiddleware'); // Auth middleware
const upload = require('../middleware/uploadMiddleware'); // File upload (Multer)

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
