const { getEmbedding } =  require("../utils/embedText.js");
const { searchSimilarChunks } = require("../utils/search.js");

const queryDocument = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    //convert query to embedding
    const queryEmbedding = await getEmbedding(query);

    //find similar chunks
    const results = searchSimilarChunks(queryEmbedding);

    return res.json({
      query,
      results,
    });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Query failed" });
  }
};

module.exports = { queryDocument };