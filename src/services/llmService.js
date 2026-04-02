const { openai } = require("../config/openAiConfig.js");

const askLLM = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
      
        {
          role: "user",
          content: prompt,
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