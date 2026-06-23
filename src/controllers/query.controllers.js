const { getEmbedding } =  require("../utils/embedText.js");
const vectorStoreService = require("../services/vectorStore/VectorStoreService.js");
const { askLLM } = require("../services/llmService.js");
const { buildPrompt } = require("../utils/buildPrompt.js");

const queryDocument = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    //convert query to embedding
    const queryEmbedding = await getEmbedding(query);

    //find similar chunks using persistent VectorStoreService with tenant isolation
    const results = await vectorStoreService.search(queryEmbedding, 3, req.tenantId);

    //build prompt
    const prompt = buildPrompt(query, results);

    //get LLM response
    const llmResponse = await askLLM(prompt);

    return res.json({
      query,
      answer: llmResponse,
      sources: results,
    });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Query failed" });
  }
};

module.exports = { queryDocument };