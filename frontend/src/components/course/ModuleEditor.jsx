import React, { useRef, useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import ResourceList from './ResourceList';
import QuizList from './QuizList';
import SparkAIButton from '../../components/SparkAIButton';

const ModuleEditor = ({
  index,
  module,
  onChange,
  onRemove,
  suggestions = [],
  onUseSuggestion,
  onReleaseSuggestion,
  courseTitle,
  courseDescription,
  token
}) => {
  const prevTitleRef = useRef(module.title);
  const [localContent, setLocalContent] = useState(module.content || '');
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  const handleChange = (field, value) => {
    const updated = { ...module, [field]: value };
    if (field === 'content') {
      setLocalContent(value);
    }
    onChange(updated);
  };

  // Sync localContent when module.content updates externally
  useEffect(() => {
    if (!localContent && module.content) {
      setLocalContent(module.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuggestionClick = (newTitle) => {
    const prevTitle = module.title;

    if (
      prevTitle &&
      prevTitle !== newTitle &&
      onReleaseSuggestion &&
      !suggestions.includes(prevTitle)
    ) {
      onReleaseSuggestion(prevTitle);
    }

    if (onUseSuggestion) {
      onUseSuggestion(newTitle);
    }

    handleChange('title', newTitle);
    prevTitleRef.current = newTitle;
  };

  const handleClearTitle = () => {
    const current = module.title;
    if (onReleaseSuggestion && current && !suggestions.includes(current)) {
      onReleaseSuggestion(current);
    }

    handleChange('title', '');
    prevTitleRef.current = '';
  };

  const fetchSuggestedVideos = async (topic) => {
    try {
      const res = await axios.get('/api/youtube/search', {
        params: { q: topic }
      });
      setSuggestedVideos(res.data);
    } catch (err) {
      console.error('Failed to auto-fetch videos:', err);
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl border dark:border-neutral-700 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
          {module.title.trim() || 'New Module'}
        </h3>
        <button
          onClick={onRemove}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={module.title}
          onChange={(e) => {
            const prev = module.title;
            const next = e.target.value;

            handleChange('title', next);

            if (
              !next &&
              prev &&
              prev !== next &&
              onReleaseSuggestion &&
              !suggestions.includes(prev)
            ) {
              onReleaseSuggestion(prev);
            }

            prevTitleRef.current = next;
          }}
          placeholder="Module Title"
          className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900 pr-10"
        />
        {module.title && (
          <button
            onClick={handleClearTitle}
            title="Clear title"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-sm bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-primary hover:text-white transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={() => handleChange('showContent', !module.showContent)}
          className="text-left text-sm font-semibold text-neutral-800 dark:text-white"
        >
          {module.showContent ? '▾' : '▸'} Content
        </button>
        {module.showContent && (
          <div className="relative">
            <textarea
              placeholder="Module Content"
              value={localContent}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 pr-12 rounded border bg-white dark:bg-neutral-900 resize-none"
            />
            <SparkAIButton
              className="absolute right-2 bottom-2"
              loading={module.generatingContent}
              onClick={async () => {
                if (!module.title || !courseTitle || !courseDescription) {
                  return alert('Course title, description, and module title are required.');
                }

                handleChange('generatingContent', true);

                try {
                  const res = await axios.post(
                    '/api/ai/generate-module-content',
                    {
                      courseTitle,
                      courseDescription,
                      moduleTitle: module.title
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  const result =
                    typeof res.data === 'string'
                      ? res.data
                      : res.data.content || '';

                  handleChange('content', result);

                  // 🔁 Auto-fetch suggested videos
                  await fetchSuggestedVideos(module.title);
                } catch (err) {
                  alert('Failed to generate content');
                } finally {
                  handleChange('generatingContent', false);
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleChange('showResources', !module.showResources)}
          className="text-left text-sm font-semibold text-neutral-800 dark:text-white"
        >
          {module.showResources ? '▾' : '▸'} Resources
        </button>
        {module.showResources && (
          <ResourceList
            resources={module.resources || []}
            onChange={(newResources) => {
              const updatedModule = { ...module, resources: newResources };
              onChange(updatedModule);
            }}
            initialSuggestions={suggestedVideos}
          />
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleChange('showQuizzes', !module.showQuizzes)}
          className="text-left text-sm font-semibold text-neutral-800 dark:text-white"
        >
          {module.showQuizzes ? '▾' : '▸'} Quizzes
        </button>
        {module.showQuizzes && (
          <QuizList
            quizzes={module.quizzes || []}
            onChange={(updatedQuizzes) =>
              handleChange('quizzes', updatedQuizzes)
            }
          />
        )}
      </div>
    </div>
  );
};

export default ModuleEditor;
