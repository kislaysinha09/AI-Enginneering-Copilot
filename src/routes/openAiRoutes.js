const express = require("express");
const { askQuestion } = require("../controllers/openAiControllers.js");

const router = express.Router();

router.post("/ask", askQuestion);

module.exports = router;