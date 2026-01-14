// utils/weightUtils.js
function calculateModuleWeight(module) {
  const contentWeight = module.content ? module.content.length : 0;

  const quizWeight = (module.quizzes || []).reduce((sum, quiz) => {
    const questionLen = quiz.question?.length || 0;
    const explLen = quiz.explanation?.length || 0;
    return sum + questionLen + explLen;
  }, 0);

  const resourceWeight = (module.resources || []).reduce((sum, res) => {
    const duration = typeof res.duration === 'string'
      ? res.duration.split(':').reduce((acc, val) => acc * 60 + +val, 0)
      : Number(res.duration) || 0;
    return sum + duration;
  }, 0);

  return {
    content: contentWeight,
    quizzes: quizWeight,
    resources: resourceWeight,
    total: contentWeight + quizWeight + resourceWeight
  };
}

module.exports = { calculateModuleWeight };
