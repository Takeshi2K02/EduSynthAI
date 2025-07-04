import React, { useState } from 'react';
import QuizConfigPanel from './QuizConfigPanel';
import axios from '../../api/axiosInstance';

const QuizList = ({ content, token, onChange }) => {
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const handleGenerate = async (config) => {
    console.log('🧪 Generating quiz with:', {
      content,
      type: config.type,
      difficulty: config.difficulty,
      count: config.questionCount
    });

    try {
      const res = await axios.post(
        '/ai/generate-quiz',
        {
          content,
          type: config.type,
          difficulty: config.difficulty,
          count: config.questionCount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGeneratedQuiz(res.data.quiz);
      if (onChange) onChange(res.data.quiz);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
      alert('Quiz generation failed.');
    }
  };

  const handleDelete = () => {
    setGeneratedQuiz(null);
    if (onChange) onChange([]);
  };

  return (
    <div className="space-y-4 mt-4">
      {!generatedQuiz ? (
        <QuizConfigPanel onGenerate={handleGenerate} />
      ) : (
        <div className="p-4 border rounded bg-white dark:bg-neutral-900 space-y-2">
          <p className="text-sm text-neutral-700 dark:text-white">
            <strong>Generated {generatedQuiz.length} Questions</strong>
          </p>

          {generatedQuiz.map((q, idx) => (
            <div key={idx} className="text-sm text-neutral-800 dark:text-white">
              <p className="mb-1 font-semibold">{idx + 1}. {q.question}</p>
              <ul className="ml-4 list-disc">
                {q.options.map((opt, i) => (
                  <li key={i} className={opt.isCorrect ? 'font-bold text-green-600' : ''}>
                    {opt.text}
                  </li>
                ))}
              </ul>
              {q.explanation && (
                <p className="text-xs text-gray-500 mt-1">💡 {q.explanation}</p>
              )}
            </div>
          ))}

          <button
            onClick={handleDelete}
            className="text-red-500 text-sm hover:underline mt-2"
          >
            Delete Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
