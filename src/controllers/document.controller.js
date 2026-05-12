const { chunkText } = require("../utils/chunkTest.js");
const { getEmbedding } = require("../utils/embedText.js");   
const vectorStoreService = require("../services/vectorStore/VectorStoreService.js");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // convert buffer → string
    const text = req.file.buffer.toString("utf-8");
    const chunks = chunkText(text);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      console.log("embedding length:", embedding.length);
      
      await vectorStoreService.addDocument(chunk, embedding, {
        fileName: req.file.originalname,
        uploadedAt: new Date().toISOString()
      });
    }

    return res.json({
      message: "Document stored in vector DB",
      totalChunks: chunks.length,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File processing failed" });
  }
};

module.exports = { uploadDocument };