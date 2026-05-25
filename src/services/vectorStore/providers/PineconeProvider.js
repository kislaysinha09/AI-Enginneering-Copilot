const { Pinecone } = require('@pinecone-database/pinecone');
const BaseProvider = require("./BaseProvider");

/**
 * Pinecone implementation of Vector Store.
 */
class PineconeProvider extends BaseProvider {
  constructor(config) {
    super();
    this.apiKey = config.apiKey;
    this.indexName = config.indexName;
    
    this.pc = new Pinecone({
      apiKey: this.apiKey,
    });
    this.index = this.pc.index(this.indexName);
  }

  async add(text, embedding, metadata = {}) {
    try {
      const id = `${metadata.fileName || 'doc'}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

      // Correct syntax for v7: an object with a 'records' array
      await this.index.upsert({
        records: [{
          id: id,
          values: embedding,
          metadata: {
            ...metadata,
            text,
          }
        }]
      });
      
      console.log(`Upsert successful for ID: ${id}`);
      return true;
    } catch (error) {
      console.error("Pinecone Add Error:", error);
      throw error;
    }
  }

  async search(queryEmbedding, topK = 3) {
    try {
      const queryResponse = await this.index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
      });

      return (queryResponse.matches || []).map(match => ({
        text: match.metadata.text,
        metadata: match.metadata,
        score: match.score,
      }));
    } catch (error) {
      console.error("Pinecone Search Error:", error);
      throw error;
    }
  }

  async clear() {
    try {
      await this.index.deleteAll();
      return true;
    } catch (error) {
      console.error("Pinecone Clear Error:", error);
      throw error;
    }
  }

  async deleteDocument(fileName) {
    try {
      await this.index.deleteMany({
        filter: {
          fileName: { "$eq": fileName }
        }
      });
      return true;
    } catch (error) {
      console.error("Pinecone Delete Error:", error);
      throw error;
    }
  }

  async listDocuments() {
    try {
      const dummyVector = new Array(1536).fill(0);
      const queryResponse = await this.index.query({
        vector: dummyVector,
        topK: 1000,
        includeMetadata: true,
      });

      const uniqueFiles = {};
      for (const match of queryResponse.matches || []) {
        const metadata = match.metadata || {};
        const fileName = metadata.fileName || 'Unknown File';
        if (!uniqueFiles[fileName]) {
          uniqueFiles[fileName] = {
            fileName,
            mimeType: metadata.mimeType || 'text/plain',
            totalChunks: 0,
          };
        }
        uniqueFiles[fileName].totalChunks += 1;
      }
      return Object.values(uniqueFiles);
    } catch (error) {
      console.error("Pinecone List Documents Error:", error);
      throw error;
    }
  }
}

module.exports = PineconeProvider;
