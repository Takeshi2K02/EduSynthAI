import React from 'react';

const SuggestedVideos = ({ videos, onSelect }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-neutral-800 dark:text-white">
        Suggested Videos
      </h4>
      <ul className="space-y-2">
        {videos.map((video, i) => (
          <li
            key={i}
            className="flex items-center gap-4 p-2 rounded border bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-16 h-10 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{video.title}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
              <p className="text-xs text-gray-400 mt-1">{video.duration}</p>
            </div>
            <button
              onClick={() => onSelect(video)}
              className="text-sm text-primary hover:underline"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedVideos;
