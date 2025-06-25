import React, { useState } from 'react';

const QuizConfigPanel = ({ onGenerate }) => {
  const [type, setType] = useState('single');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(1);
  const [generated, setGenerated] = useState(false);

  const handleIncrement = () => {
    setQuestionCount((prev) => Math.min(10, prev + 1));
  };

  const handleDecrement = () => {
    setQuestionCount((prev) => Math.max(1, prev - 1));
  };

  const handleGenerate = () => {
    setGenerated(true);
    if (onGenerate) {
      onGenerate({ type, difficulty, questionCount });
    }
  };

  const handleReset = () => {
    setGenerated(false);
    setQuestionCount(1);
  };

  return (
    <div className="space-y-4">
      {!generated ? (
        <>
          {/* Responsive Inline Form Row */}
          <div className="flex flex-col md:flex-row md:gap-6">
            {/* Quiz Type */}
            <div className="flex-1 space-y-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white min-h-[20px]">
                Quiz Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded border bg-white dark:bg-neutral-900"
              >
                <option value="single">Single Answer</option>
                <option value="multiple">Multiple Answer</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="flex-1 space-y-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white min-h-[20px]">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded border bg-white dark:bg-neutral-900"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div className="flex-1 flex flex-col justify-between space-y-1">
            <label className="block text-sm font-medium text-neutral-700 dark:text-white min-h-[20px]">
                Number of Questions
            </label>
            <div className="flex items-center gap-2">
                <button
                type="button"
                onClick={handleDecrement}
                className="px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded text-sm"
                >
                –
                </button>
                <span className="w-10 text-center text-sm font-medium">
                {questionCount}
                </span>
                <button
                type="button"
                onClick={handleIncrement}
                className="px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded text-sm"
                >
                +
                </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 h-4">Min 1, Max 10</div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
          >
            Generate Quiz
          </button>
        </>
      ) : (
        <div className="p-4 border rounded bg-white dark:bg-neutral-900 space-y-2">
          <p className="text-sm text-neutral-700 dark:text-white">
            Quiz Type: <strong>{type}</strong>
          </p>
          <p className="text-sm text-neutral-700 dark:text-white">
            Difficulty: <strong>{difficulty}</strong>
          </p>
          <p className="text-sm text-neutral-700 dark:text-white">
            Number of Questions: <strong>{questionCount}</strong>
          </p>

          <button
            onClick={handleReset}
            className="text-red-500 text-sm hover:underline"
          >
            Delete Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizConfigPanel;
