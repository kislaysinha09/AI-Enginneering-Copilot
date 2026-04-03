const { openai } = require( "../config/openAiConfig.js");


const getEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Embedding Error:", error);
    throw new Error("Failed to generate embedding");
  }
};

module.exports = { getEmbedding };