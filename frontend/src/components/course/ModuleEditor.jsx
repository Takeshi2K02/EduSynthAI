import React from 'react';
import ResourceList from './ResourceList';
import QuizList from './QuizList';

const ModuleEditor = ({ module, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange({ ...module, [field]: value });
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl border dark:border-neutral-700 space-y-4">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
          {module.title || 'New Module'}
        </h3>
        <button
          onClick={onRemove}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Module Title"
        value={module.title}
        onChange={(e) => handleChange('title', e.target.value)}
        className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900"
      />

      {/* Content */}
      <textarea
        placeholder="Module Content"
        value={module.content}
        onChange={(e) => handleChange('content', e.target.value)}
        rows={4}
        className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900 resize-none"
      />

      {/* Resources */}
      <ResourceList
        resources={module.resources || []}
        onChange={(updatedResources) => handleChange('resources', updatedResources)}
      />

      {/* Quizzes */}
      <QuizList
        quizzes={module.quizzes || []}
        onChange={(updatedQuizzes) => handleChange('quizzes', updatedQuizzes)}
      />
    </div>
  );
};

export default ModuleEditor;
