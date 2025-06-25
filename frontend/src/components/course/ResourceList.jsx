import React, { useState } from 'react';
import SuggestedVideos from './SuggestedVideos';
import SelectedVideos from './SelectedVideos';

const dummySuggested = [
  {
    videoUrl: 'https://www.youtube.com/watch?v=abcd1234',
    title: 'Intro to AI',
    description: 'A beginner guide to artificial intelligence.',
    thumbnail: 'https://img.youtube.com/vi/abcd1234/hqdefault.jpg',
    duration: '12:34',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=wxyz5678',
    title: 'Machine Learning Basics',
    description: 'Understanding how machines learn from data.',
    thumbnail: 'https://img.youtube.com/vi/wxyz5678/hqdefault.jpg',
    duration: '09:20',
  }
];

const ResourceList = ({ resources, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggested, setSuggested] = useState(dummySuggested);
  const [selected, setSelected] = useState(resources);

  const handleSelectVideo = (video) => {
    if (!selected.find(v => v.videoUrl === video.videoUrl)) {
      const updated = [...selected, video];
      setSelected(updated);
      onChange(updated);
    }
  };

  const handleRemoveVideo = (videoUrl) => {
    const updated = selected.filter(v => v.videoUrl !== videoUrl);
    setSelected(updated);
    onChange(updated);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // In future step: fetch videos via YouTube API here
    // For now, we’ll just simulate it using the same dummySuggested
    setSuggested(dummySuggested);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search YouTube videos"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded border bg-white dark:bg-neutral-900"
      />

      {/* Suggested Videos */}
      <SuggestedVideos
        videos={suggested}
        onSelect={handleSelectVideo}
      />

      {/* Selected Videos */}
      <SelectedVideos
        videos={selected}
        onRemove={handleRemoveVideo}
      />
    </div>
  );
};

export default ResourceList;
