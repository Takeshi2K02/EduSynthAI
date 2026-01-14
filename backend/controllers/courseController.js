const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');
const { calculateModuleWeight } = require('../utils/weightUtils');

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    console.log('🚀 req.body:', req.body);
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

    // ✅ 1. Calculate raw module weights
    const modulesWithRawWeights = parsedModules.map((mod) => {
      const weights = calculateModuleWeight(mod);

      const updatedQuizzes = (mod.quizzes || []).map((quiz) => ({
        ...quiz,
        weight: (quiz.question?.length || 0) + (quiz.explanation?.length || 0)
      }));

      const updatedResources = (mod.resources || []).map((res) => {
        const duration = typeof res.duration === 'string'
          ? res.duration.split(':').reduce((acc, val) => acc * 60 + +val, 0)
          : Number(res.duration) || 0;

        return {
          ...res,
          weight: duration
        };
      });

      return {
        title: mod.title,
        content: mod.content || '', // ✅ Ensure content is preserved
        quizzes: updatedQuizzes,
        resources: updatedResources,
        _internalWeight: weights.total,
        __details: weights
      };
    });

    const totalWeight = modulesWithRawWeights.reduce((sum, mod) => sum + mod._internalWeight, 0);

    const normalizedModules = modulesWithRawWeights.map((mod) => {
      const normalizedWeight = totalWeight > 0
        ? mod._internalWeight / totalWeight
        : 1 / modulesWithRawWeights.length;

      return {
        ...mod,
        weight: normalizedWeight
      };
    });

    normalizedModules.forEach(m => {
      delete m._internalWeight;
      delete m.__details;
    });

    const course = new Course({
      title,
      description,
      modules: normalizedModules,
      creator: req.user._id
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

// GET /api/courses/grouped
exports.getGroupedCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const courses = await Course.find({ creator: userId }).lean();

    const grouped = {
      pending: [],
      current: [],
      completed: []
    };

    for (const course of courses) {
      const status = course.status || 'pending';
      grouped[status]?.push(course);
    }

    res.json(grouped);
  } catch (err) {
    console.error('Error grouping courses:', err);
    res.status(500).json({ error: 'Failed to load grouped courses' });
  }
};


// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('creator', 'name email')
      .lean(); // required for mutation

    if (!course) return res.status(404).json({ error: 'Course not found' });

    let moduleProgressMap = {};

    if (req.user?._id) {
      const progressDoc = await UserCourseProgress.findOne({
        userId: req.user._id,
        courseId: course._id
      }).lean();

      if (progressDoc?.modules?.length > 0) {
        for (const m of progressDoc.modules) {
          moduleProgressMap[m.moduleId?.toString()] = m.completed;
        }
      }
    }

    const modulesWithCompletion = course.modules.map(mod => ({
      ...mod,
      completed: moduleProgressMap[mod._id?.toString()] || false
    }));

    res.json({
      ...course,
      modules: modulesWithCompletion
    });

  } catch (err) {
    console.error('Course fetch error:', err);
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
