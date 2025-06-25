const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  total: Number,
  submittedAt: { type: Date, default: Date.now }
});

const ModuleProgressSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId },
  completed: { type: Boolean, default: false },
  quizAttempts: [QuizAttemptSchema]
});

const UserCourseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  modules: [ModuleProgressSchema],
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('UserCourseProgress', UserCourseProgressSchema);