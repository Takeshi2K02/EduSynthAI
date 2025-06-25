const promptTemplates = {
  courseDescription: (title) => `
Write a compelling and clear course description for a course titled:
"${title}"

Guidelines:
- Keep it under 100 words.
- Focus on the value learners will get.
- Avoid technical jargon unless necessary.
`,

  moduleContent: (moduleTitle) => `
Generate detailed learning content for a module titled: "${moduleTitle}".
Include 2–3 paragraphs that introduce, explain, and summarize the topic.
`,

  quizFromContent: (content, type, difficulty, count) => `
Generate ${count} ${type === 'multiple' ? 'multiple answer' : 'single answer'} quiz questions based on the following content:

"${content}"

Difficulty level: ${difficulty}

Each question should:
- Include 4 options
- Mark correct answers
- Include a 1-line explanation
- Return as JSON array
`,

  moduleSuggestions: (title, description) => `
Based on the course titled "${title}" with the description:

"${description}"

Suggest 5 concise and unique module titles suitable for a modular online course structure. Each title should be:
- No more than 7 words
- Self-explanatory
- Ordered logically from basic to advanced

Return them as a plain numbered list, like:
1. ...
2. ...
3. ...
4. ...
5. ...
`,
};

module.exports = promptTemplates;
