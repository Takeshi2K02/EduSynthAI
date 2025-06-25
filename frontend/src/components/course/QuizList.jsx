import React from 'react';

const QuizList = ({ quizzes, onChange }) => {
  const handleAddQuiz = () => {
    const newQuiz = {
      title: '',
      type: 'single',
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    };
    onChange([...quizzes, newQuiz]);
  };

  const handleRemoveQuiz = (index) => {
    const updated = [...quizzes];
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateQuiz = (index, field, value) => {
    const updated = [...quizzes];
    updated[index][field] = value;
    onChange(updated);
  };

  const updateOption = (quizIndex, optionIndex, field, value) => {
    const updated = [...quizzes];
    if (field === 'correct' && updated[quizIndex].type === 'single') {
      // Uncheck others for single-type quiz
      updated[quizIndex].options = updated[quizIndex].options.map((opt, i) => ({
        ...opt,
        correct: i === optionIndex,
      }));
    } else {
      updated[quizIndex].options[optionIndex][field] = value;
    }
    onChange(updated);
  };

  const addOption = (quizIndex) => {
    const updated = [...quizzes];
    updated[quizIndex].options.push({ text: '', correct: false });
    onChange(updated);
  };

  return (
    <div className="space-y-2 mt-4">
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-white">Quizzes</h4>

      {quizzes.map((quiz, i) => (
        <div key={i} className="p-4 bg-white dark:bg-neutral-900 rounded border space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-neutral-800 dark:text-white">
              Quiz {i + 1}
            </span>
            <button
              onClick={() => handleRemoveQuiz(i)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Question"
            value={quiz.title}
            onChange={(e) => updateQuiz(i, 'title', e.target.value)}
            className="w-full px-3 py-2 rounded border bg-white dark:bg-neutral-900"
          />

          <select
            value={quiz.type}
            onChange={(e) => updateQuiz(i, 'type', e.target.value)}
            className="w-full px-3 py-2 rounded border bg-white dark:bg-neutral-900"
          >
            <option value="single">Single Answer</option>
            <option value="multiple">Multiple Answer</option>
          </select>

          {quiz.options.map((opt, j) => (
            <div key={j} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={opt.correct}
                onChange={(e) => updateOption(i, j, 'correct', e.target.checked)}
              />
              <input
                type="text"
                placeholder={`Option ${j + 1}`}
                value={opt.text}
                onChange={(e) => updateOption(i, j, 'text', e.target.value)}
                className="flex-1 px-3 py-1 rounded border bg-white dark:bg-neutral-900"
              />
            </div>
          ))}

          <button
            onClick={() => addOption(i)}
            className="text-xs text-primary hover:underline mt-1"
          >
            + Add Option
          </button>
        </div>
      ))}

      <button
        onClick={handleAddQuiz}
        className="text-sm px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
      >
        + Add Quiz
      </button>
    </div>
  );
};

export default QuizList;
