import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import SparkAIButton from './SparkAIButton';

const ModuleEditor = ({
  index,
  module,
  onChange,
  onRemove,
  suggestions = [],
  courseTitle,
  courseDescription,
}) => {
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [videoSuggestions, setVideoSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFieldChange = (field, value) => {
    onChange({ ...module, [field]: value });
  };

  const handleUseSuggestion = (suggestion) => {
    handleFieldChange('title', suggestion);
  };

  const handleGenerateContent = async () => {
    if (!courseTitle || !courseDescription || !module.title) {
      return alert('Course title, description, and module title are required');
    }

    setLoadingContent(true);
    try {
      const res = await axios.post('/ai/generate-module-content', {
        courseTitle,
        courseDescription,
        moduleTitle: module.title,
      });
      handleFieldChange('content', res.data.content || '');
    } catch (err) {
      console.error('❌ Content Generation Error:', err?.response?.data || err.message);
      alert('Failed to generate content.');
    } finally {
      setLoadingContent(false);
    }
  };

  const handleGenerateQuiz = async () => {
  if (!module.content) {
    return alert('Module content is required to generate quiz.');
  }

  setLoadingQuiz(true);
  try {
    const res = await axios.post('/ai/generate-quiz', {
      content: module.content,
      type: 'single',
      difficulty: 'medium',
      count: 3,
    });

    console.log('🧪 Quiz API response:', res.data);

    const quiz = res.data.quiz;
    if (Array.isArray(quiz)) {
      handleFieldChange('quizzes', quiz);
    } else {
      throw new Error('Invalid quiz format');
    }
  } catch (err) {
    console.error('❌ Quiz Generation Error:', err?.response?.data || err.message);
    alert('Failed to generate quiz.');
  } finally {
    setLoadingQuiz(false);
  }
};

  const handleAddResource = (video) => {
    const alreadyExists = module.resources?.some((r) => r.videoUrl === video.url);
    if (!alreadyExists) {
      const cleanVideo = {
        title: video.title,
        videoUrl: video.url,
        thumbnail: video.thumbnail,
        source: 'YouTube',
      };
      handleFieldChange('resources', [...(module.resources || []), cleanVideo]);
    }
  };

  const handleManualSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(`/youtube/search?q=${encodeURIComponent(searchQuery)}&maxResults=5`);
      setVideoSuggestions(res.data || []);
    } catch (err) {
      console.error('❌ Manual Search Error:', err?.response?.data || err.message);
      alert('Failed to fetch results.');
    }
  };

  useEffect(() => {
    const fetchYouTubeSuggestions = async () => {
      if (!module.content?.trim()) return;
      try {
        const q = `${courseTitle} ${module.title} ${module.content.slice(0, 100)}`;
        const res = await axios.get(`/youtube/search?q=${encodeURIComponent(q)}&maxResults=5`);
        setVideoSuggestions(res.data || []);
      } catch (err) {
        console.error('❌ YouTube Suggestions Error:', err?.response?.data || err.message);
      }
    };
    fetchYouTubeSuggestions();
  }, [module.content]);

  const isAdded = (video) =>
    module.resources?.some((r) => r.videoUrl === video.url);

  return (
    <div className="p-4 rounded-md border border-gray-700 bg-gray-800 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-200">Module {index + 1}</h3>
        <button onClick={onRemove} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm mb-1 text-gray-300">Title</label>
        <input
          type="text"
          value={module.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white"
          placeholder="Module title"
        />
        {suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((sugg, i) => (
              <button
                key={i}
                onClick={() => handleUseSuggestion(sugg)}
                className="bg-gray-700 text-sm text-gray-100 px-3 py-1 rounded-full hover:bg-gray-600 transition"
              >
                {sugg}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <label className="block text-sm mb-1 text-gray-300">Content</label>
        <textarea
          value={module.content}
          onChange={(e) => handleFieldChange('content', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 pr-10 rounded-md bg-gray-700 border border-gray-600 text-white resize-none overflow-auto custom-scroll-hide"
          placeholder="Module content..."
        />
        <SparkAIButton onClick={handleGenerateContent} loading={loadingContent} />
      </div>

      {/* YouTube Search */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Search YouTube Videos</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white"
            placeholder="Search for videos..."
          />
          <button
            onClick={handleManualSearch}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Suggested Videos */}
      {videoSuggestions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Videos</label>
          <div className="grid grid-cols-1 gap-3">
            {videoSuggestions.map((video, idx) => !isAdded(video) && (
              <div key={idx} className="flex items-center gap-4 p-2 rounded-md bg-gray-700">
                <img src={video.thumbnail} alt={video.title} className="w-20 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium line-clamp-2">{video.title}</p>
                  <a href={video.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                    View on YouTube
                  </a>
                </div>
                <button
                  onClick={() => handleAddResource(video)}
                  className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Resources */}
      {module.resources?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Selected Resources</label>
          <div className="grid grid-cols-1 gap-3">
            {module.resources.map((res, idx) => (
              <div key={idx} className="flex items-center gap-4 p-2 bg-gray-800 border border-gray-700 rounded-md">
                <img src={res.thumbnail} alt={res.title} className="w-20 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm text-white">{res.title}</p>
                  <a href={res.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                    View
                  </a>
                </div>
                <button
                  onClick={() =>
                    handleFieldChange('resources', module.resources.filter((_, i) => i !== idx))
                  }
                  className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Generator */}
      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">Quizzes</label>
          <button
            onClick={handleGenerateQuiz}
            disabled={loadingQuiz}
            className="text-sm px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50"
          >
            {loadingQuiz ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        {/* Display Quizzes */}
        {module.quizzes?.length > 0 && (
          <div className="mt-3 space-y-4">
            {module.quizzes.map((quiz, i) => (
              <div key={i} className="p-3 rounded bg-gray-700 border border-gray-600">
                <p className="text-white font-medium mb-1">{i + 1}. {quiz.question}</p>
                <ul className="space-y-1 text-sm text-gray-300 pl-4 list-disc">
                    {quiz.options.map((opt, j) => (
                        <li
                        key={j}
                        className={opt.isCorrect ? 'text-green-400 font-semibold' : ''}
                        >
                        {opt.text}
                        </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleEditor;