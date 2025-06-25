const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/courses'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, modules, createdBy } = req.body;

    const newCourse = new Course({
      title,
      description,
      thumbnailPath: req.file?.path || '',
      modules: JSON.parse(modules),
      totalModules: JSON.parse(modules).length,
      createdBy,
    });

    await newCourse.save();
    return res.status(201).json({ message: 'Course created', courseId: newCourse._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Course creation failed' });
  }
});

module.exports = router;
