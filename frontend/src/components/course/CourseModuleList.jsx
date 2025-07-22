import React from 'react';
import ModuleEditor from './ModuleEditor';

const CourseModuleList = ({
  modules,
  onAdd,
  onUpdate,
  onRemove,
  canAdd,
  courseTitle,
  courseDescription,
  suggestions = [],
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Modules</h2>
        <button
          onClick={onAdd}
          disabled={!canAdd}
          className={`px-3 py-1.5 rounded-md transition font-medium
            ${canAdd
              ? 'bg-primary text-white hover:bg-primary-hover'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Add Module
        </button>
      </div>

      {modules.length === 0 && (
        <p className="text-sm text-gray-400">No modules added yet.</p>
      )}

      {modules.map((mod, idx) => (
        <ModuleEditor
          key={mod.id}
          index={idx}
          module={mod}
          onChange={(updated) => onUpdate(idx, updated)}
          onRemove={() => onRemove(idx)}
          courseTitle={courseTitle}
          courseDescription={courseDescription}
          suggestions={suggestions}
        />
      ))}
    </div>
  );
};

export default CourseModuleList;
