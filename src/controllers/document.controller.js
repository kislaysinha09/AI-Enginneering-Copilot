const { chunkText } = require("../utils/chunkTest.js");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // convert buffer → string
    const text = req.file.buffer.toString("utf-8");
    const chunks = chunkText(text);

    return res.json({
      message: "File processed successfully",
      totalChunks: chunks.length,
      chunks,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File processing failed" });
  }
};

module.exports = { uploadDocument };