const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authenticate = require('../middleware/authMiddleware');

router.post('/generate-description', authenticate, aiController.generateCourseDescription);
router.post('/generate-modules', authenticate, aiController.generateModuleTitles);
router.post('/generate-module-content', authenticate, aiController.generateModuleContent);
router.post('/generate-quiz', authenticate, aiController.generateQuiz);

module.exports = router;
