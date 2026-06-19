require('dotenv').config();
const supabase = require('./src/supabaseClient');
// SUPABASE_JWT_SECRET is no longer used; Supabase client is initialized in supabaseClient.js

if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class {};
}
// Polyfill ImageData for environments lacking it
if (typeof global.ImageData === 'undefined') {
  global.ImageData = class {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.data = new Uint8ClampedArray(width * height * 4);
    }
  };
}
// Polyfill Path2D for environments lacking it
if (typeof global.Path2D === 'undefined') {
  global.Path2D = class {
    constructor(path) {
      this.path = path || '';
    }
  };
}

// Polyfill process.getBuiltinModule for libraries expecting it
if (typeof process.getBuiltinModule !== 'function') {
  process.getBuiltinModule = () => {
    // Return undefined or a mock; most callers only check existence
    return undefined;
  };
}

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
const protectedRoutes = require("./src/routes/protectedRoutes.js");
app.use("/api/protected", protectedRoutes);

// Lightweight health check route for frontend indicators
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Aether RAG Engine" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})