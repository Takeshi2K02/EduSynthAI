import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CommonLayout from '../components/CommonLayout';
import { getGroupedCourses } from '../services/courseService';

const Dashboard = () => {
  const [groupedCourses, setGroupedCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔐 Grab userId from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getGroupedCourses();
        setGroupedCourses(data);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const renderGroup = (status, courses) => (
    <div key={status} className="z-10 relative">
      <h2 className="text-xl font-semibold mb-2">{status.charAt(0).toUpperCase() + status.slice(1)} Courses</h2>
      {courses.length === 0 ? (
        <p className="text-neutral-400 dark:text-neutral-500">No courses in this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              status={status}
              index={index}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <CommonLayout>
      <div className="relative min-h-full p-6 space-y-8">
        {/* === Background Glow Effects === */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#29AFCD] rounded-full blur-[70px] opacity-50 -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[90px] opacity-40 -z-10"></div>

        <h1 className="text-3xl font-bold text-primary z-10">Your Courses</h1>

        {loading && <p className="text-neutral-500">Loading courses...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {groupedCourses && (
          <>
            {renderGroup('pending', groupedCourses.pending)}
            {renderGroup('current', groupedCourses.current)}
            {renderGroup('completed', groupedCourses.completed)}
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
