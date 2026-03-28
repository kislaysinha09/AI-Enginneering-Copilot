const multer = require("multer");

// store files in memory (faster for now)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = {upload};