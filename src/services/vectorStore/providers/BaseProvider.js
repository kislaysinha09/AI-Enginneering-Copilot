/**
 * Base class for Vector Store Providers.
 * Ensures a consistent interface for different vector databases.
 */
class BaseProvider {
  /**
   * Add a document with its embedding to the store.
   * @param {string} text - The original text chunk.
   * @param {Array<number>} embedding - The vector embedding.
   * @param {Object} metadata - Additional metadata.
   */
  async add(text, embedding, metadata = {}) {
    throw new Error("Method 'add' must be implemented");
  }

  /**
   * Search for similar chunks.
   * @param {Array<number>} queryEmbedding - The embedding of the query.
   * @param {number} topK - Number of results to return.
   * @returns {Promise<Array<Object>>} - Array of matching chunks with scores.
   */
  async search(queryEmbedding, topK = 3) {
    throw new Error("Method 'search' must be implemented");
  }

  /**
   * Clear the store.
   */
  async clear() {
    throw new Error("Method 'clear' must be implemented");
  }

  /**
   * Delete all chunks belonging to a specific document.
   * @param {string} fileName - The name of the file to delete.
   */
  async deleteDocument(fileName) {
    throw new Error("Method 'deleteDocument' must be implemented");
  }

  /**
   * List all unique documents stored in the vector store.
   * @returns {Promise<Array<Object>>} - List of files with metadata.
   */
  async listDocuments() {
    throw new Error("Method 'listDocuments' must be implemented");
  }
}

module.exports = BaseProvider;
