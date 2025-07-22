import React from 'react';
import SparkAIButton from './SparkAIButton';

const CourseDescriptionInput = ({ value, onChange, onSparkClick, loading }) => {
  return (
    <div className="relative">
      <label className="block mb-1 font-medium text-sm text-gray-200">
        Course Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter course description or use AI to generate"
        rows={5}
        className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <SparkAIButton onClick={onSparkClick} loading={loading} />
    </div>
  );
};

export default CourseDescriptionInput;