const LocalFileProvider = require("./providers/LocalFileProvider");

/**
 * Service to manage vector storage operations.
 * Defaults to LocalFileProvider for persistence.
 */
class VectorStoreService {
  constructor(provider = new LocalFileProvider()) {
    this.provider = provider;
  }

  /**
   * Add a text chunk and its embedding.
   */
  async addDocument(text, embedding, metadata = {}) {
    return await this.provider.add(text, embedding, metadata);
  }

  /**
   * Search for similar documents.
   */
  async search(queryEmbedding, topK = 3) {
    return await this.provider.search(queryEmbedding, topK);
  }

  /**
   * Set a different provider (e.g., Pinecone).
   */
  setProvider(provider) {
    this.provider = provider;
  }
}

// Singleton instance for global use
const vectorStoreService = new VectorStoreService();
module.exports = vectorStoreService;
