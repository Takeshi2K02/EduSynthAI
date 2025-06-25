const { generateDescription, generateModuleSuggestions } = require('../services/geminiService');

exports.generateCourseDescription = async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const description = await generateDescription(title);
    res.json({ description });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate description' });
  }
};

exports.generateModuleTitles = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const modules = await generateModuleSuggestions(title, description);
    res.json({ modules });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate module suggestions' });
  }
};