const express = require("express");
const { upload } = require("../middleware/upload.js");
const { uploadDocument } = require("../controllers/document.controller.js");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);

module.exports = router;