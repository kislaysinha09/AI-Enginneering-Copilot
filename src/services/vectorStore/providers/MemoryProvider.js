const BaseProvider = require("./BaseProvider");
const { cosineSimilarity } = require("../../../utils/cosineSimilarity");

/**
 * In-memory implementation of Vector Store.
 * Note: Data is lost when server restarts.
 */
class MemoryProvider extends BaseProvider {
  constructor() {
    super();
    this.store = [];
  }

  async add(text, embedding, metadata = {}) {
    this.store.push({
      text,
      embedding,
      metadata,
    });
    return true;
  }

  async search(queryEmbedding, topK = 3) {
    const scoredResults = this.store
      .map((item) => ({
        text: item.text,
        metadata: item.metadata,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scoredResults;
  }

  async clear() {
    this.store = [];
    return true;
  }

  async deleteDocument(fileName) {
    this.store = this.store.filter(item => item.metadata?.fileName !== fileName);
    return true;
  }

  async listDocuments() {
    const uniqueFiles = {};
    for (const item of this.store) {
      const fileName = item.metadata?.fileName || 'Unknown File';
      if (!uniqueFiles[fileName]) {
        uniqueFiles[fileName] = {
          fileName,
          mimeType: item.metadata?.mimeType || 'text/plain',
          totalChunks: 0,
        };
      }
      uniqueFiles[fileName].totalChunks += 1;
    }
    return Object.values(uniqueFiles);
  }
}

module.exports = MemoryProvider;
