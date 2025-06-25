const mongoose = require('mongoose');

const UserCourseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
  completedResources: [{ type: mongoose.Schema.Types.ObjectId }],
  completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId }],
  updatedAt: { type: Date, default: Date.now }
});

UserCourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('UserCourseProgress', UserCourseProgressSchema);