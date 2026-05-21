const LocalFileProvider = require("./providers/LocalFileProvider");
const PineconeProvider = require("./providers/PineconeProvider");
require('dotenv').config();

/**
 * Service to manage vector storage operations.
 */
class VectorStoreService {
  constructor() {
    this.provider = this._initializeProvider();
  }

  _initializeProvider() {
    // If Pinecone credentials are provided, use Pinecone
    if (process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX_NAME) {
      console.log("Using Pinecone Vector Store");
      return new PineconeProvider({
        apiKey: process.env.PINECONE_API_KEY,
        indexName: process.env.PINECONE_INDEX_NAME,
      });
    }

    // Default to LocalFileProvider for development
    console.log("Using Local File Vector Store");
    return new LocalFileProvider();
  }

  async addDocument(text, embedding, metadata = {}) {
    return await this.provider.add(text, embedding, metadata);
  }

  async search(queryEmbedding, topK = 3) {
    return await this.provider.search(queryEmbedding, topK);
  }

  setProvider(provider) {
    this.provider = provider;
  }
}

const vectorStoreService = new VectorStoreService();
module.exports = vectorStoreService;
