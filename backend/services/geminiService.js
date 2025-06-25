const axios = require('axios');
const parseGeminiQuizOutput = require('../utils/parseGeminiQuizOutput');
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

const promptTemplates = require('../prompts/promptTemplates');

const generateDescription = async (title) => {
  const prompt = promptTemplates.courseDescription(title);

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const res = await axios.post(`${GEMINI_URL}?key=${API_KEY}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'No description generated.';
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    throw new Error('Failed to generate description');
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const generateModuleSuggestions = async (title, description) => {
  const prompt = promptTemplates.moduleSuggestions(title, description);

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await axios.post(`${GEMINI_URL}?key=${API_KEY}`, body, {
        headers: { 'Content-Type': 'application/json' }
      });

      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('No suggestion text returned');

      const modules = text
        .split('\n')
        .map(line => line.trim().replace(/^\d+\.\s*/, ''))
        .filter(Boolean);

      return modules;
    } catch (err) {
      if (err.response?.status === 503 && attempt < 2) {
        console.warn(`Gemini overloaded (attempt ${attempt + 1}). Retrying...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.error('Gemini module suggestion error:', err.response?.data || err.message);
        throw new Error('Failed to generate module suggestions');
      }
    }
  }
};

const generateModuleContent = async (courseTitle, courseDescription, moduleTitle) => {
  const prompt = promptTemplates.moduleContentFromCourse(courseTitle, courseDescription, moduleTitle);

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await axios.post(`${GEMINI_URL}?key=${API_KEY}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'No content generated.';
  } catch (err) {
    console.error('Gemini content generation error:', err.response?.data || err.message);
    throw new Error('Failed to generate module content');
  }
};

const generateQuizFromContent = async (content, type, difficulty, count = 3) => {
  const prompt = promptTemplates.quizFromContent(content, type, difficulty, count);

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await axios.post(`${GEMINI_URL}?key=${API_KEY}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No quiz text returned');

    // ✅ Add this line to inspect the raw Gemini response
    console.log('🧪 Gemini raw quiz response:\n', text);

    return parseGeminiQuizOutput(text);
  } catch (err) {
    console.error('Gemini quiz generation error:', err.response?.data || err.message);
    throw new Error('Failed to generate quiz');
  }
};


module.exports = {
  generateDescription,
  generateModuleSuggestions,
  generateModuleContent,
  generateQuizFromContent
};