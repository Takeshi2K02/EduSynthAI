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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const generateModuleSuggestions = async (title, description) => {
  const promptTemplates = require('../prompts/promptTemplates');
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

module.exports = { generateDescription, generateModuleSuggestions };
