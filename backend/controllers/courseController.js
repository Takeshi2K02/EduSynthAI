const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    console.log('🚀 req.body:', req.body);
    console.log('📦 typeof req.body.modules:', typeof req.body.modules);
    console.log('🖼️  file received:', req.file ? req.file.filename : 'none');

    const { title, description, modules } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Course title is required' });
    }

    let parsedModules = [];
    try {
      parsedModules = modules ? JSON.parse(modules) : [];
    } catch (err) {
      return res.status(400).json({ error: 'Invalid modules format. Must be JSON string.' });
    }

    const course = new Course({
      title,
      description,
      modules: parsedModules,
      creator: req.user._id,
    });

    if (req.file) {
      course.thumbnail = `/uploads/${req.file.filename}`;
    }

    await course.save();
    res.status(201).json({ message: '✅ Course created successfully', course });

  } catch (err) {
    console.error('❌ Create course error:', err);
    res.status(500).json({ error: 'Server error while creating course' });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('creator', 'name email');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching course' });
  }
};

// GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('creator', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Error listing courses' });
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: not the creator' });
    }

    if (course.thumbnail) {
      const filePath = path.join(__dirname, '..', course.thumbnail);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting course' });
  }
};
