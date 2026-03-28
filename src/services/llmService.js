const { openai } = require("../config/openAiConfig.js");

const askLLM = async (question) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("LLM Error:", error);
    throw new Error("Failed to get response from LLM");
  }
};

module.exports = { askLLM };