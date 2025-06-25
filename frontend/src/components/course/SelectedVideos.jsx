import React from 'react';

const SelectedVideos = ({ videos, onRemove }) => {
  if (videos.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-neutral-800 dark:text-white">
        Selected Videos
      </h4>
      <ul className="space-y-2">
        {videos.map((video, i) => (
          <li
            key={i}
            className="flex items-center gap-4 p-2 rounded border bg-white dark:bg-neutral-900"
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
              onClick={() => onRemove(video.videoUrl)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedVideos;
