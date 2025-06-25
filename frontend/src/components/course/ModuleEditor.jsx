import React, { useRef } from 'react';
import ResourceList from './ResourceList';
import QuizList from './QuizList';

const ModuleEditor = ({
  module,
  onChange,
  onRemove,
  suggestions = [],
  onUseSuggestion,
  onReleaseSuggestion
}) => {
  const prevTitleRef = useRef(module.title);

  const handleChange = (field, value) => {
    onChange({ ...module, [field]: value });
  };

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

  const isSuggested = suggestions.length === 0 || suggestions.includes(module.title);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl border dark:border-neutral-700 space-y-4">
      {/* Module Header */}
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

      {/* Title Input + Suggestions */}
      <div className="space-y-2">
        {isSuggested && module.title ? (
          <div className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900 flex items-center gap-2 group">
            <span className="text-sm font-medium text-neutral-800 dark:text-white">
              {module.title}
            </span>
            <button
              onClick={handleClearTitle}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              title="Remove selected title"
            >
              &times;
            </button>
          </div>
        ) : (
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
            className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900"
          />
        )}

        {/* Shared Suggestion Pool */}
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
      </div>

      {/* Expand/Collapse Content */}
      <div className="space-y-2">
        <button
          onClick={() => handleChange('showContent', !module.showContent)}
          className="text-left text-sm font-semibold text-neutral-800 dark:text-white"
        >
          {module.showContent ? '▾' : '▸'} Content
        </button>
        {module.showContent && (
          <textarea
            placeholder="Module Content"
            value={module.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900 resize-none"
          />
        )}
      </div>

      {/* Expand/Collapse Resources */}
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
            onChange={(updatedResources) =>
              handleChange('resources', updatedResources)
            }
          />
        )}
      </div>

      {/* Expand/Collapse Quizzes */}
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
