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
Generate ${count} ${type === 'multiple' ? 'multiple-correct-answer' : 'single-correct-answer'} quiz questions based on the following educational content:

---
${content}
---

Return your answer as a JSON array. Each quiz question object should include:

- "question": the full question as a string
- "type": "single" or "multiple"
- "options": an array of 4 strings (answer choices)
- "correctAnswers": an array of indexes (0-based) indicating which options are correct
- "explanation": a short explanation for the correct answer(s)
- "difficulty": one of "easy", "medium", or "hard"

Do not include any extra explanation or markdown. Return only the raw JSON array.
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

  moduleContentFromCourse: (courseTitle, courseDescription, moduleTitle) => `
You're writing educational content for a course.

Course Title: "${courseTitle}"
Course Description: "${courseDescription}"
Module Title: "${moduleTitle}"

Write 2–3 informative and engaging paragraphs introducing and explaining this module topic.
Make it understandable for beginners, but professional.
Avoid fluff. Be clear and educational.
`
};

module.exports = promptTemplates;