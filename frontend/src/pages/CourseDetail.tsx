import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/courseService';
import YouTube from 'react-youtube';
import CommonLayout from '../components/CommonLayout';

type CourseType = {
  title: string;
  description: string;
  modules: {
    _id?: string;
    title: string;
    content?: string;
    resources?: { title: string; videoUrl: string }[];
    quizzes?: {
      question: string;
      options: { text: string; isCorrect: boolean }[];
      explanation?: string;
    }[];
  }[];
};

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseType | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div className="p-4">Loading course...</div>;

  return (
    <CommonLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-400 mb-6">{course.description}</p>

        {course.modules?.map((module, idx) => (
          <div key={module._id || idx} className="mb-8 border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold mb-2">{module.title}</h2>

            {module.content && (
              <div className="prose prose-invert mb-4">
                <h3 className="text-xl font-medium text-gray-300">Content</h3>
                <p>{module.content}</p>
              </div>
            )}

            {module.resources && module.resources.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Resources</h3>
                {module.resources.map((res, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-semibold">{res.title}</p>
                    <YouTube videoId={res.videoUrl.split('v=')[1]} opts={{ width: '100%', height: '360' }} />
                  </div>
                ))}
              </div>
            )}

            {module.quizzes && module.quizzes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Quizzes</h3>
                {module.quizzes.map((quiz, i) => (
                  <div key={i} className="mb-4 p-3 border border-gray-700 rounded-md">
                    <p className="font-semibold mb-1">Q: {quiz.question}</p>
                    <ul className="list-disc ml-6 text-gray-300">
                      {quiz.options.map((opt, j) => (
                        <li key={j} className={opt.isCorrect ? 'text-green-400' : ''}>{opt.text}</li>
                      ))}
                    </ul>
                    {quiz.explanation && (
                      <p className="text-sm text-gray-500 mt-2 italic">Explanation: {quiz.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </CommonLayout>
  );
}
