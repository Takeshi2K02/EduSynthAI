const express = require('express');
const { getYouTubeSearchResults } = require('../controllers/youtubeController');

const router = express.Router();

router.get('/search', getYouTubeSearchResults);

module.exports = router;