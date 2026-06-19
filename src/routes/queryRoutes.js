const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware.js");
const { queryDocument } = require("../controllers/query.controllers.js");

const router = express.Router();

router.post("/query", requireAuth, queryDocument);

module.exports = router;