import React, { useState, useEffect } from 'react';
import SuggestedVideos from './SuggestedVideos';
import SelectedVideos from './SelectedVideos';
import axios from '../../api/axiosInstance';

const ResourceList = ({ resources, onChange, initialSuggestions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggested, setSuggested] = useState([]);
  const [selected, setSelected] = useState(resources);

  // Load initial suggestions once (on mount)
  useEffect(() => {
    setSuggested(initialSuggestions);
  }, [initialSuggestions]);

  const handleSelectVideo = (video) => {
    if (!selected.find(v => v.url === video.url)) {
      const updated = [...selected, video];
      setSelected(updated);
      onChange(updated);
    }
  };

  const handleRemoveVideo = (videoUrl) => {
    const updated = selected.filter(v => v.url !== videoUrl);
    setSelected(updated);
    onChange(updated);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggested([]);
      return;
    }

    try {
      const res = await axios.get('/youtube/search', {
        params: { q: value }
      });
      setSuggested(res.data);
    } catch (err) {
      console.error('YouTube fetch error:', err);
    }
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
