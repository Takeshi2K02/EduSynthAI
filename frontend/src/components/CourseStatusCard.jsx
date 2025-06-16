import React from 'react';

const CourseStatusCard = ({
  title,
  description,
  modules,
  progress,
  status,
  image,
  index,
}) => {
  const progressPercent = Math.round((progress / modules) * 100);
  const keyword = encodeURIComponent(title.split(' ').join(','));
  const fallbackImage = image || `https://source.unsplash.com/featured/400x250?${keyword}&sig=${index}`;

  const statusStyle = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Current: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md w-full max-w-[280px] aspect-[4/5] flex flex-col border border-neutral-200 dark:border-neutral-800">
      {/* Image + Status */}
      <div className="relative">
        <img
          src={fallbackImage}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4 gap-2">
        {/* Title */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {description}
        </p>

        {/* Progress */}
        <div className="flex items-center justify-between mt-auto">
          <div className="w-1/2 h-2 bg-neutral-200 dark:bg-neutral-700 rounded">
            <div
              className="h-2 bg-primary rounded transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {progress}/{modules} modules
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseStatusCard;