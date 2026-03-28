const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // convert buffer → string
    const text = req.file.buffer.toString("utf-8");

    return res.json({
      message: "File processed successfully",
      text,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File processing failed" });
  }
};

module.exports = { uploadDocument };