const documentProcessor = require("../services/documentProcessor.js");
const { defaultSplitter } = require("../utils/textSplitter.js");
const { getEmbedding } = require("../utils/embedText.js");   
const vectorStoreService = require("../services/vectorStore/VectorStoreService.js");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Extract text based on file type (PDF, DOCX, Text)
    const text = await documentProcessor.extractText(req.file.buffer, req.file.mimetype);
    
    // Split the text into semantic chunks using RecursiveCharacterTextSplitter
    const chunks = defaultSplitter.splitText(text);

    // Metadata to attach to each chunk
    const metadata = {
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
    };

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      await vectorStoreService.addDocument(chunk, embedding, metadata);
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