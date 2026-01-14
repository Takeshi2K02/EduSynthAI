import React from 'react';

const CourseTitleInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="block mb-1 font-medium text-sm text-gray-200">
        Course Title
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter course title"
        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default CourseTitleInput;