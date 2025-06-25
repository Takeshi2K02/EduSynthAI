import React, { useState } from 'react';
import QuizConfigPanel from './QuizConfigPanel';

const QuizList = () => {
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const handleGenerate = (config) => {
    // For now we just store the config as a placeholder
    setGeneratedQuiz(config);
  };

  const handleDelete = () => {
    setGeneratedQuiz(null);
  };

  return (
    <div className="space-y-4 mt-4">
      {!generatedQuiz ? (
        <QuizConfigPanel onGenerate={handleGenerate} />
      ) : (
        <div className="p-4 border rounded bg-white dark:bg-neutral-900 space-y-2">
          <p className="text-sm text-neutral-700 dark:text-white">
            <strong>Type:</strong> {generatedQuiz.type}
          </p>
          <p className="text-sm text-neutral-700 dark:text-white">
            <strong>Difficulty:</strong> {generatedQuiz.difficulty}
          </p>
          <p className="text-sm text-neutral-700 dark:text-white">
            <strong>Questions:</strong> {generatedQuiz.questionCount}
          </p>

          <button
            onClick={handleDelete}
            className="text-red-500 text-sm hover:underline"
          >
            Delete Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
