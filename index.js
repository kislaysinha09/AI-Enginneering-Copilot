// Polyfill for pdf-parse compatibility with Node 20+
if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class {};
}

require('dotenv').config();
const express = require('express');
const app = express();

const openAiRoutes = require("./src/routes/openAiRoutes.js");
const documentRoutes = require("./src/routes/documentRoutes.js");
const queryRoutes = require("./src/routes/queryRoutes.js"); 

app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api", openAiRoutes, queryRoutes);
app.use("/api/documents", documentRoutes);

// Lightweight health check route for frontend indicators
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Aether RAG Engine" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})