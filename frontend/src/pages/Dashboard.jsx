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
    <div className="relative min-h-full p-6 space-y-8">

        {/* === Background Glow Effects === */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#29AFCD] rounded-full blur-[70px] opacity-50 -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[90px] opacity-40 -z-10"></div>

        {/* === Main Content === */}
        <h1 className="text-3xl font-bold text-primary z-10">Your Courses</h1>

        {Object.keys(courseData).map((status) => (
        <div key={status} className="z-10 relative">
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