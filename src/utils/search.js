const { vectorStore } = require("../db/vectorStore.js");
const { cosineSimilarity } = require("./cosineSimilarity.js");

const searchSimilarChunks = (queryEmbedding, topK = 3) => {
  const scores = vectorStore.map((item) => {
    const score = cosineSimilarity(queryEmbedding, item.embedding);

    return {
      text: item.text,
      score,
    };
  });

  // sort by highest similarity
  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, topK);
};

module.exports = { searchSimilarChunks };   