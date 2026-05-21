require('dotenv').config();
const express = require('express');
const openAiRoutes = require('./routes/openAiRoutes.js');
const documentRoutes = require('./routes/documentRoutes.js');
const queryRoutes = require('./routes/queryRoutes.js');

const app = express();
app.use(express.json());
app.use('/api', openAiRoutes, queryRoutes);
app.use('/api/documents', documentRoutes);

module.exports = app;
