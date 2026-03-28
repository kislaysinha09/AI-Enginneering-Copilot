const { askLLM } = require("../services/llmService.js");

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await askLLM(question);

    return res.json({ answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { askQuestion };