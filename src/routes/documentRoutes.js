const express = require("express");
const { upload } = require("../middleware/upload.js");
const { uploadDocument, getDocuments, deleteDocument } = require("../controllers/document.controller.js");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getDocuments);
router.delete("/:fileName", deleteDocument);

module.exports = router;