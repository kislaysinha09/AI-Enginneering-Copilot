const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware.js");
const { askQuestion } = require("../controllers/openAiControllers.js");

const router = express.Router();

router.post("/ask", requireAuth, askQuestion);

module.exports = router;