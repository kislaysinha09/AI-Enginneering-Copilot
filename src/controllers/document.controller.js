const documentProcessor = require("../services/documentProcessor.js");
const { defaultSplitter } = require("../utils/textSplitter.js");
const { getEmbedding } = require("../utils/embedText.js");   
const vectorStoreService = require("../services/vectorStore/VectorStoreService.js");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    console.log(`Processing file: ${req.file.originalname} (${req.file.mimetype})`);

    // 1. Extract text based on file type
    const text = await documentProcessor.extractText(req.file.buffer, req.file.mimetype);
    
    // 2. Chunk text semantically
    const chunks = defaultSplitter.splitText(text);
    console.log(`Split into ${chunks.length} chunks`);

    // 3. Embed and Store
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await getEmbedding(chunk);
      
      await vectorStoreService.addDocument(chunk, embedding, {
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        chunkIndex: i,
        totalChunks: chunks.length,
        uploadedAt: new Date().toISOString()
      });
    }

    return res.json({
      message: "Document processed and stored",
      totalChunks: chunks.length,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ 
      error: "File processing failed", 
      details: error.message 
    });
  }
};

module.exports = { uploadDocument };