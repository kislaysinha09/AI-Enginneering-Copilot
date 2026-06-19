const express = require("express");
const { upload } = require("../middleware/upload.js");
const { requireAuth } = require("../middleware/authMiddleware.js");
const { uploadDocument, getDocuments, deleteDocument } = require("../controllers/document.controller.js");

const router = express.Router();

//router.use(requireAuth);

router.post("/upload", requireAuth, upload.single("file"), uploadDocument);
router.get("/", requireAuth, getDocuments);
router.delete("/:fileName", requireAuth, deleteDocument);

module.exports = router;