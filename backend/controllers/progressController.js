// controllers/progressController.js
const Course = require('../models/Course');
const UserCourseProgress = require('../models/UserCourseProgress');
const calculateProgress = require('../utils/calculateProgress');

// GET /api/progress/:courseId?userId=...
const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'Missing userId or courseId' });
    }

    const [course, userProgress] = await Promise.all([
      Course.findById(courseId).lean(),
      UserCourseProgress.findOne({ userId, courseId }).lean()
    ]);

    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (!userProgress) return res.status(200).json({ progress: 0 });

    const progress = calculateProgress(course, userProgress);
    return res.json({ progress });
  } catch (err) {
    console.error('Progress Fetch Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/progress/mark-complete
const markItemComplete = async (req, res) => {
  try {
    const { userId, courseId, itemType, itemId } = req.body;

    if (!userId || !courseId || !itemType || !itemId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validTypes = {
      lesson: 'completedLessons',
      resource: 'completedResources',
      quiz: 'completedQuizzes',
    };

    const field = validTypes[itemType];
    if (!field) return res.status(400).json({ error: 'Invalid itemType' });

    const update = {
      $addToSet: { [field]: itemId }, // prevents duplicates
      $set: { updatedAt: new Date() }
    };

    await UserCourseProgress.findOneAndUpdate(
      { userId, courseId },
      update,
      { upsert: true, new: true }
    );

    return res.json({ message: `${itemType} marked complete` });
  } catch (err) {
    console.error('Mark Complete Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/progress/dashboard
const getUserDashboardProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progresses = await UserCourseProgress.find({ user: userId }).lean();
    const courseIds = progresses.map(p => p.course);

    const courses = await Course.find({ _id: { $in: courseIds } }).lean();

    const result = progresses.map(progressDoc => {
      const course = courses.find(c => c._id.toString() === progressDoc.course.toString());
      const progress = calculateProgress(course, progressDoc);
      return { course, progress };
    });

    res.json(result);
  } catch (err) {
    console.error('Dashboard progress fetch error:', err);
    res.status(500).json({ error: 'Failed to load dashboard progress' });
  }
};

module.exports = {
  getUserCourseProgress,
  markItemComplete,
  getUserDashboardProgress
};