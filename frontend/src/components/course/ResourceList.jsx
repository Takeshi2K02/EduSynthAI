import React, { useState } from 'react';

const getYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
};

const ResourceList = ({ resources, onChange }) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleAdd = async () => {
    const videoId = getYouTubeVideoId(inputUrl);
    if (!videoId) return alert('Invalid YouTube URL');

    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    const data = await response.json();

    const newResource = {
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      title: data.title || 'Untitled',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      channel: data.author_name || 'Unknown',
    };

    onChange([...resources, newResource]);
    setInputUrl('');
  };

  const handleRemove = (index) => {
    const updated = [...resources];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-white">Resources</h4>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1 px-3 py-2 rounded border bg-white dark:bg-neutral-900"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Add
        </button>
      </div>

      {resources.length > 0 && (
        <ul className="space-y-2 mt-2">
          {resources.map((res, i) => (
            <li
              key={i}
              className="flex items-center gap-4 p-2 rounded border bg-white dark:bg-neutral-900"
            >
              <img
                src={res.thumbnail}
                alt={res.title}
                className="w-16 h-10 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{res.title}</p>
                <p className="text-xs text-gray-500">{res.channel}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceList;
