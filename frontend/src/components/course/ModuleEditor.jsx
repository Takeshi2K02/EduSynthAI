import React from 'react';

const ModuleEditor = ({ index, module, onChange, onRemove, suggestions = [] }) => {
  const handleFieldChange = (field, value) => {
    onChange({ ...module, [field]: value });
  };

  const handleUseSuggestion = (suggestion) => {
    handleFieldChange('title', suggestion);
  };

  return (
    <div className="p-4 rounded-md border border-gray-700 bg-gray-800 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-200">Module {index + 1}</h3>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Remove
        </button>
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-300">Title</label>
        <input
          type="text"
          value={module.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="Module title"
          className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
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

      <div>
        <label className="block text-sm mb-1 text-gray-300">Content</label>
        <textarea
          value={module.content}
          onChange={(e) => handleFieldChange('content', e.target.value)}
          placeholder="Module content..."
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-none"
        />
      </div>
    </div>
  );
};

export default ModuleEditor;
