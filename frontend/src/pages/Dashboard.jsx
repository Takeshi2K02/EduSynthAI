import React from 'react';
import CourseStatusCard from '../components/CourseStatusCard';

const Dashboard = () => {
  const defaultImage = '/images/courses/default.jpg';

  const courseData = {
    Pending: [
      {
        title: 'React Basics',
        description: 'Learn to build UIs with components.',
        modules: 5,
        progress: 2,
        image: defaultImage,
      },
      {
        title: 'Node.js Setup',
        description: 'Install Node.js and configure backend project.',
        modules: 3,
        progress: 0,
        image: defaultImage,
      },
    ],
    Current: [
      {
        title: 'AI Content Generation',
        description: 'Generate content using AI models like Gemini.',
        modules: 8,
        progress: 4,
        image: defaultImage,
      },
    ],
    Completed: [
      {
        title: 'JavaScript Fundamentals',
        description: 'Understand the basics of JS: variables, loops, functions.',
        modules: 10,
        progress: 10,
        image: defaultImage,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 h-full overflow-y-auto scrollbar-hide">
      <h1 className="text-3xl font-bold text-primary">Your Courses</h1>

      {Object.keys(courseData).map((status) => (
        <div key={status}>
          <h2 className="text-xl font-semibold mb-2">{status} Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseData[status].map((course, index) => (
              <CourseStatusCard key={index} index={index} status={status} {...course} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;