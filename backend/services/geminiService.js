const axios = require('axios');
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

const generateDescription = async (title) => {
    const promptTemplates = require('../prompts/promptTemplates');
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

module.exports = { generateDescription };
