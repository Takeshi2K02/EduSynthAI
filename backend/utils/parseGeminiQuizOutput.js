const parseGeminiQuizOutput = (text) => {
  if (!text) throw new Error('Empty Gemini output');

  // ✅ Try JSON parsing first
  try {
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed) && parsed[0]?.question) {
      return parsed.map(item => ({
        question: item.question,
        type: Array.isArray(item.correct_answer) ? 'multiple' : 'single',
        options: item.options.map(opt => ({
          text: opt,
          isCorrect: Array.isArray(item.correct_answer)
            ? item.correct_answer.includes(opt)
            : opt === item.correct_answer
        })),
        explanation: item.explanation || '',
        difficulty: 'medium',
        tags: [],
        generatedBy: 'AI'
      }));
    }
  } catch (jsonErr) {
    // fallback to text parsing
  }

  // ✅ Existing logic here (fallback)
  try {
    const blocks = text
      .split(/\n\s*\n/)
      .filter(block => /Correct:\s*\[[\d, ]+\]/.test(block));

    const parsed = blocks.map((block) => {
      const correctMatch = block.match(/Correct:\s*\[([\d, ]+)\]/);
      const correctIndexes = correctMatch
        ? correctMatch[1].split(',').map(n => parseInt(n.trim()) - 1)
        : [];

      const explanationMatch = block.match(/Explanation:\s*(.*)/);
      const explanation = explanationMatch ? explanationMatch[1].trim() : '';

      const lines = block.replace(/Correct:\s*\[.*\]/, '').split('\n').map(line => line.trim());

      const question = lines[0].replace(/^\d+\.\s*/, '');
      const options = lines
        .slice(1)
        .filter(line => /^\d+\.\s/.test(line))
        .map(line => line.replace(/^\d+\.\s*/, ''));

      return {
        question,
        type: correctIndexes.length > 1 ? 'multiple' : 'single',
        options: options.map((text, index) => ({
          text,
          isCorrect: correctIndexes.includes(index)
        })),
        explanation,
        difficulty: 'medium',
        tags: [],
        generatedBy: 'AI'
      };
    });

    return parsed;
  } catch (err) {
    throw new Error('Failed to parse Gemini quiz output: ' + err.message);
  }
};

module.exports = parseGeminiQuizOutput;
