require('dotenv').config();
const OpenAI = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL,
});

module.exports = { openai };