const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authenticate = require('../middleware/authMiddleware');

router.post('/generate-description', authenticate, aiController.generateCourseDescription);

module.exports = router;
