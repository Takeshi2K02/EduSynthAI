// models/Course.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  type: { type: String, enum: ['single', 'multiple'], required: true },
  question: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  weight: { type: Number, default: 0 }, // relative to parent module
});

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  youtubeId: String,
  videoUrl: String,
  duration: String, // e.g., "10:34"
  weight: { type: Number, default: 0 },
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  weight: { type: Number, default: 0 },
});

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  weight: { type: Number, default: 0 },
  lessons: [LessonSchema],
  resources: [ResourceSchema],
  quizzes: [QuizSchema],
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnailPath: { type: String }, // stored on disk
  status: {
    type: String,
    enum: ['Pending', 'Current', 'Completed'],
    default: 'Pending',
  },
  modules: [ModuleSchema],
  totalModules: { type: Number, default: 0 },
  totalWeight: { type: Number, default: 1.0 }, // normalized
  progress: {
    type: Map,
    of: Number, // userId -> progress % (0–1)
    default: {},
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  dueAt: { type: Date },

  // Extendability hooks
  tags: [String],
  certificateIssuedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  discussionsEnabled: { type: Boolean, default: false },
  aiGeneratedSummary: { type: String }, // future: AI tutor summary
});

module.exports = mongoose.model('Course', CourseSchema);