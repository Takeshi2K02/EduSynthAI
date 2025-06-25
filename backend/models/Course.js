const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const QuizSchema = new mongoose.Schema({
  type: { type: String, enum: ['single', 'multiple'], required: true },
  question: { type: String, required: true },
  options: [OptionSchema],
  explanation: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  tags: [String],
  weight: { type: Number, default: 0 },
  generatedBy: { type: String, enum: ['AI', 'Manual'], default: 'Manual' },
  createdAt: { type: Date, default: Date.now }
});

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String },
  duration: { type: String },
  source: { type: String, enum: ['YouTube', 'Vimeo', 'Upload'], default: 'YouTube' },
  channel: { type: String },
  publishedAt: { type: Date }
});

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  resources: [ResourceSchema],
  quizzes: [QuizSchema]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'current', 'completed'], default: 'pending' },
  modules: [ModuleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
