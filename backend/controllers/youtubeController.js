const { fetchYouTubeVideos } = require('../services/youtubeService');

exports.getYouTubeSearchResults = async (req, res) => {
  const { q, maxResults = 5 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query (q) is required' });
  }

  try {
    const videos = await fetchYouTubeVideos(q, maxResults);
    res.json(videos);
  } catch (err) {
    console.error('YouTube Controller Error:', err);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};

