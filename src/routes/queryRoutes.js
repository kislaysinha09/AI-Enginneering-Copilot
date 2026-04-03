const express = require("express");
const { queryDocument } = require("../controllers/query.controllers.js");

const router = express.Router();

router.post("/query", queryDocument);

module.exports = router;