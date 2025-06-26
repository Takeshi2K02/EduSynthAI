const axios = require('axios');

// Make sure .env is loaded at app startup via index.js
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';

console.log('🔑 YOUTUBE_API_KEY:', YOUTUBE_API_KEY); // Log to confirm it's loaded

async function fetchYouTubeVideos(query, maxResults = 5) {
  try {
    const searchRes = await axios.get(SEARCH_URL, {
      params: {
        part: 'snippet',
        q: query,
        key: YOUTUBE_API_KEY,
        type: 'video',
        maxResults,
      },
    });

    const videoIds = searchRes.data.items?.map((item) => item.id.videoId).join(',');

    if (!videoIds) return [];

    const detailsRes = await axios.get(VIDEOS_URL, {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    return detailsRes.data.items.map((video) => ({
      url: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      duration: parseDuration(video.contentDetails.duration),
    }));
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    return [];
  }
}

function parseDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, hours = 0, minutes = 0, seconds = 0] = match.map((val) => parseInt(val || 0, 10));
  return hours * 3600 + minutes * 60 + seconds;
}

module.exports = { fetchYouTubeVideos };
