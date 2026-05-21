const fs = require('fs').promises;
const path = require('path');
const BaseProvider = require("./BaseProvider");
const { cosineSimilarity } = require("../../../utils/cosineSimilarity");

/**
 * Local File implementation of Vector Store.
 * Uses a JSON file for persistence.
 */
class LocalFileProvider extends BaseProvider {
  constructor(filePath = 'vector_db.json') {
    super();
    this.filePath = path.resolve(process.cwd(), filePath);
    this.store = [];
    this.isLoaded = false;
  }

  async _load() {
    if (this.isLoaded) return;
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.store = JSON.parse(data);
    } catch (error) {
      this.store = [];
    }
    this.isLoaded = true;
  }

  async _save() {
    await fs.writeFile(this.filePath, JSON.stringify(this.store, null, 2));
  }

  async add(text, embedding, metadata = {}) {
    await this._load();
    this.store.push({ text, embedding, metadata });
    await this._save();
    return true;
  }

  async search(queryEmbedding, topK = 3) {
    await this._load();
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
    await this._save();
    return true;
  }
}

module.exports = LocalFileProvider;
