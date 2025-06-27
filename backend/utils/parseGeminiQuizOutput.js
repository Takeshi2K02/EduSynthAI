const parseGeminiQuizOutput = (text) => {
  if (!text) throw new Error('Empty Gemini output');

  // ✅ Strip markdown ```json ... ``` block if present
  const cleaned = text
    .replace(/^```json\s*/i, '')  // remove starting ```json
    .replace(/```$/, '')          // remove ending ```
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Failed to parse Gemini JSON: ' + err.message);
  }

  if (!Array.isArray(parsed)) throw new Error('Expected an array of quiz questions');

  return parsed.map((item, index) => {
    const {
      question,
      type,
      options,
      correctAnswers,
      explanation,
      difficulty
    } = item;

    if (!question || !Array.isArray(options) || options.length !== 4 || !Array.isArray(correctAnswers)) {
      throw new Error(`Invalid quiz structure at index ${index}`);
    }

    return {
      question: question.trim(),
      type: type === 'multiple' ? 'multiple' : 'single',
      options: options.map((text, i) => ({
        text: text.trim(),
        isCorrect: correctAnswers.includes(i)
      })),
      explanation: explanation?.trim() || '',
      difficulty: ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium',
      tags: []
    };
  });
};

module.exports = parseGeminiQuizOutput;
