import React, { useEffect, useState } from 'react';
import { getCourseProgress } from '../services/courseService'; // 🔄 uses updated service file

const CourseCard = ({
  course,
  status = 'pending',
  index = 0,
  userId = null,
}) => {
  const [progress, setProgress] = useState(0);
  const modules = course.modules?.length || 0;
  const progressPercent = Math.round((progress / modules) * 100);

  const keyword = encodeURIComponent(course.title?.split(' ').join(','));
  const fallbackImage = course.thumbnail?.startsWith('/uploads')
  ? `http://localhost:5000${course.thumbnail}`
  : (course.thumbnail || '/placeholder.jpg');


  const statusStyle = {
    pending: 'bg-yellow-100 text-yellow-800',
    current: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  useEffect(() => {
    if (!course._id || !userId || modules === 0) return;

    const fetchProgress = async () => {
      try {
        const value = await getCourseProgress(course._id, userId);
        setProgress(Math.round(modules * value));
      } catch (err) {
        console.error('Failed to load progress:', err);
      }
    };

    fetchProgress();
  }, [course._id, userId, modules]);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md w-full max-w-[280px] aspect-[4/5] flex flex-col border border-neutral-200 dark:border-neutral-800">
      {/* Image + Status */}
      <div className="relative">
        <img
          src={fallbackImage}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${statusStyle[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4 gap-2">
        {/* Title */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {course.description?.replace(/[#*_]/g, '')}
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

export default CourseCard;
